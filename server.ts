import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// Voice profiles tailored for Grade 5 Journey to the West storytelling
interface VoiceProfile {
  voiceName: 'Puck' | 'Charon' | 'Kore' | 'Fenrir' | 'Zephyr';
  style: string;
}

function getVoiceProfile(speaker?: string): VoiceProfile {
  switch (speaker) {
    case 'Sun Wukong':
    case 'Wukong':
      return {
        voiceName: 'Puck',
        style: 'Lively, playful, confident young hero speaking clear American English for elementary students',
      };
    case 'Dragon King':
      return {
        voiceName: 'Charon',
        style: 'Deep, calm, dignified ancient king speaking clear English',
      };
    case 'Dragon Queen':
      return {
        voiceName: 'Kore',
        style: 'Warm, expressive, gentle storyteller speaking clear English',
      };
    case 'Judge of the Dead':
    case 'Judge':
      return {
        voiceName: 'Fenrir',
        style: 'Firm, dramatic, authoritative judge speaking clear English',
      };
    case 'Narrator':
    default:
      return {
        voiceName: 'Zephyr',
        style: 'Warm, natural, friendly English storybook narrator speaking clearly at an easy pace for Grade 5 students',
      };
  }
}

// In-memory LRU-style audio cache (base64 WAV strings)
const MAX_CACHE_ENTRIES = 250;
const ttsCache = new Map<string, string>();

function setCacheEntry(key: string, value: string): void {
  if (ttsCache.size >= MAX_CACHE_ENTRIES) {
    const oldestKey = ttsCache.keys().next().value;
    if (oldestKey !== undefined) {
      ttsCache.delete(oldestKey);
    }
  }
  ttsCache.set(key, value);
}

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer(): Promise<void> {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  // Natural human-sounding Gemini Text-to-Speech endpoint
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

      const profile = getVoiceProfile(speaker);
      const cacheKey = `${profile.voiceName}:${rawText}`;

      const cachedAudio = ttsCache.get(cacheKey);
      if (cachedAudio) {
        res.json({
          audioBase64: cachedAudio,
          mimeType: 'audio/wav',
          voiceName: profile.voiceName,
          cached: true,
        });
        return;
      }

      const ai = getGeminiClient();
      if (!ai) {
        res.status(503).json({
          error: 'GEMINI_API_KEY is not configured for server-side TTS.',
        });
        return;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash-lite-tts',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: rawText,
                speechMetadata: {
                  style: profile.style,
                },
              },
            ],
          },
        ],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: profile.voiceName,
              },
            },
          },
        },
      });

      const base64Audio =
        response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

      if (!base64Audio) {
        res.status(502).json({ error: 'No audio data returned by Gemini TTS.' });
        return;
      }

      setCacheEntry(cacheKey, base64Audio);

      res.json({
        audioBase64: base64Audio,
        mimeType: 'audio/wav',
        voiceName: profile.voiceName,
        cached: false,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to generate natural speech.';
      console.error('[TTS Error]', message);
      res.status(500).json({ error: message });
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
