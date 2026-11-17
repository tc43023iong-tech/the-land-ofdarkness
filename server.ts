import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import fs from 'fs/promises';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const DISK_CACHE_DIR = '/tmp/jttw-tts-cache';

interface PublicVoiceProfile {
  lang: string;
}

function getPublicVoiceProfile(speaker?: string): PublicVoiceProfile {
  switch (speaker) {
    case 'Dragon King':
    case 'Judge of the Dead':
    case 'Judge':
      return { lang: 'en-GB' };
    case 'Sun Wukong':
    case 'Wukong':
    case 'Dragon Queen':
    case 'Narrator':
    default:
      return { lang: 'en-US' };
  }
}

// Split text cleanly into chunks <= 180 chars for public TTS endpoint
function splitTextForTts(text: string, maxLen = 180): string[] {
  const cleaned = text.replace(/\s+/g, ' ').trim();
  if (!cleaned) return [];
  if (cleaned.length <= maxLen) return [cleaned];

  const chunks: string[] = [];
  let remaining = cleaned;

  while (remaining.length > maxLen) {
    let splitIdx = -1;
    // Prefer splitting at sentence or clause punctuation
    for (const sep of ['. ', '! ', '? ', '; ', ', ', ' ']) {
      const idx = remaining.lastIndexOf(sep, maxLen);
      if (idx > maxLen * 0.35) {
        splitIdx = idx + sep.length;
        break;
      }
    }
    if (splitIdx === -1) {
      splitIdx = maxLen;
    }
    const piece = remaining.slice(0, splitIdx).trim();
    if (piece) chunks.push(piece);
    remaining = remaining.slice(splitIdx).trim();
  }

  if (remaining) chunks.push(remaining);
  return chunks;
}

// In-memory LRU audio cache (base64 MP3 strings)
const MAX_CACHE_ENTRIES = 300;
const ttsCache = new Map<string, string>();

function setMemoryCache(key: string, value: string): void {
  if (ttsCache.size >= MAX_CACHE_ENTRIES) {
    const oldestKey = ttsCache.keys().next().value;
    if (oldestKey !== undefined) {
      ttsCache.delete(oldestKey);
    }
  }
  ttsCache.set(key, value);
}

async function readDiskCache(cacheKey: string): Promise<string | null> {
  try {
    const hash = crypto.createHash('sha1').update(cacheKey).digest('hex');
    const filePath = path.join(DISK_CACHE_DIR, `${hash}.mp3`);
    const buf = await fs.readFile(filePath);
    return buf.toString('base64');
  } catch {
    return null;
  }
}

async function writeDiskCache(cacheKey: string, audioBuffer: Buffer): Promise<void> {
  try {
    await fs.mkdir(DISK_CACHE_DIR, { recursive: true });
    const hash = crypto.createHash('sha1').update(cacheKey).digest('hex');
    const filePath = path.join(DISK_CACHE_DIR, `${hash}.mp3`);
    await fs.writeFile(filePath, audioBuffer);
  } catch {
    // Non-fatal if /tmp cache write fails
  }
}

async function fetchPublicNaturalTts(text: string, lang: string): Promise<Buffer> {
  const chunks = splitTextForTts(text, 180);
  const audioBuffers: Buffer[] = [];

  for (const chunk of chunks) {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${encodeURIComponent(
      lang
    )}&q=${encodeURIComponent(chunk)}`;

    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        Referer: 'https://translate.google.com/',
      },
    });

    if (!response.ok) {
      throw new Error(`Public TTS upstream returned HTTP ${response.status}`);
    }

    const arrayBuf = await response.arrayBuffer();
    const buf = Buffer.from(arrayBuf);
    if (buf.length === 0) {
      throw new Error('Public TTS returned empty audio buffer.');
    }
    audioBuffers.push(buf);
  }

  return Buffer.concat(audioBuffers);
}

async function startServer(): Promise<void> {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  // Public natural-voice Text-to-Speech endpoint (no per-minute free-tier quota limits)
  app.post('/api/tts', async (req: Request, res: Response) => {
    try {
      const rawText = typeof req.body?.text === 'string' ? req.body.text.trim() : '';
      const speaker = typeof req.body?.speaker === 'string' ? req.body.speaker.trim() : undefined;

      if (!rawText) {
        res.status(400).json({ error: 'Text is required for speech synthesis.' });
        return;
      }

      if (rawText.length > 1000) {
        res.status(400).json({ error: 'Text is too long (max 1000 characters).' });
        return;
      }

      const profile = getPublicVoiceProfile(speaker);
      const cacheKey = `${profile.lang}:${rawText}`;

      const memoryCached = ttsCache.get(cacheKey);
      if (memoryCached) {
        res.json({
          audioBase64: memoryCached,
          mimeType: 'audio/mpeg',
          voiceName: profile.lang,
          cached: true,
        });
        return;
      }

      const diskCached = await readDiskCache(cacheKey);
      if (diskCached) {
        setMemoryCache(cacheKey, diskCached);
        res.json({
          audioBase64: diskCached,
          mimeType: 'audio/mpeg',
          voiceName: profile.lang,
          cached: true,
        });
        return;
      }

      const audioBuffer = await fetchPublicNaturalTts(rawText, profile.lang);
      const base64Audio = audioBuffer.toString('base64');

      setMemoryCache(cacheKey, base64Audio);
      void writeDiskCache(cacheKey, audioBuffer);

      res.json({
        audioBase64: base64Audio,
        mimeType: 'audio/mpeg',
        voiceName: profile.lang,
        cached: false,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to generate natural speech.';
      console.warn('[TTS Fallback]', message);
      res.status(503).json({ error: message });
    }
  });

  if (IS_PRODUCTION) {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
