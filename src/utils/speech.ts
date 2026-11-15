/**
 * Natural Voice Text-to-Speech controller:
 * Uses server-side Gemini Natural TTS (/api/tts) with client-side WAV caching,
 * and falls back gracefully to the clearest available browser voice if offline/unavailable.
 */

export interface SpeakOptions {
  rate?: number;
  pitch?: number;
  speaker?: string;
  onEnd?: () => void;
  onError?: () => void;
}

class SpeechController {
  private synth: SpeechSynthesis | null = null;
  private currentAudio: HTMLAudioElement | null = null;
  private activeAbortController: AbortController | null = null;
  private audioCache = new Map<string, string>();
  private speaking = false;
  private playbackSequence = 0;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      // Trigger voice list population early in browsers that load voices asynchronously
      this.synth.getVoices();
    }
  }

  private cleanEnglishText(text: string): string {
    return text.replace(/\([^)]*[\u4e00-\u9fa5]+[^)]*\)/g, '').trim();
  }

  private speakWithBrowserFallback(
    cleanText: string,
    options: SpeakOptions,
    sequenceId: number
  ): void {
    if (!this.synth) {
      this.speaking = false;
      options.onError?.();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'en-US';
    utterance.rate = options.rate || 1.0;
    utterance.pitch = options.pitch || 1.0;

    const voices = this.synth.getVoices();
    const preferredVoice =
      voices.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.includes('Natural') ||
            v.name.includes('Neural') ||
            v.name.includes('Google US English') ||
            v.name.includes('Samantha') ||
            v.name.includes('Daniel'))
      ) ||
      voices.find((v) => v.lang.startsWith('en') && v.name.includes('Google')) ||
      voices.find((v) => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      if (this.playbackSequence !== sequenceId) return;
      this.speaking = false;
      options.onEnd?.();
    };

    utterance.onerror = () => {
      if (this.playbackSequence !== sequenceId) return;
      this.speaking = false;
      options.onError?.();
    };

    this.synth.speak(utterance);
  }

  private playAudioUrl(
    dataUrl: string,
    options: SpeakOptions,
    sequenceId: number
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.playbackSequence !== sequenceId) {
        resolve();
        return;
      }

      const audio = new Audio(dataUrl);
      audio.playbackRate = options.rate || 1.0;
      this.currentAudio = audio;

      audio.onended = () => {
        if (this.playbackSequence === sequenceId) {
          this.currentAudio = null;
          this.speaking = false;
          options.onEnd?.();
        }
        resolve();
      };

      audio.onerror = () => {
        if (this.playbackSequence === sequenceId) {
          this.currentAudio = null;
          this.speaking = false;
        }
        reject(new Error('Audio element failed to play WAV audio.'));
      };

      audio.play().catch((err) => {
        if (this.playbackSequence === sequenceId) {
          this.currentAudio = null;
          this.speaking = false;
        }
        reject(err);
      });
    });
  }

  public async speak(text: string, options: SpeakOptions = {}): Promise<void> {
    this.stop();

    const cleanText = this.cleanEnglishText(text);
    if (!cleanText) {
      options.onEnd?.();
      return;
    }

    const sequenceId = ++this.playbackSequence;
    this.speaking = true;

    const cacheKey = `${options.speaker || 'Narrator'}:${cleanText}`;
    const cachedUrl = this.audioCache.get(cacheKey);

    if (cachedUrl) {
      try {
        await this.playAudioUrl(cachedUrl, options, sequenceId);
        return;
      } catch {
        // Fall through to fresh fetch or browser fallback
        this.audioCache.delete(cacheKey);
      }
    }

    const controller = new AbortController();
    this.activeAbortController = controller;

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: cleanText,
          speaker: options.speaker,
        }),
        signal: controller.signal,
      });

      if (this.playbackSequence !== sequenceId) return;

      if (!response.ok) {
        throw new Error(`TTS HTTP ${response.status}`);
      }

      const data = (await response.json()) as {
        audioBase64?: string;
        mimeType?: string;
      };

      if (this.playbackSequence !== sequenceId) return;

      if (!data.audioBase64) {
        throw new Error('Missing audioBase64 in TTS response');
      }

      const mimeType = data.mimeType || 'audio/wav';
      const dataUrl = `data:${mimeType};base64,${data.audioBase64}`;

      if (this.audioCache.size >= 150) {
        const oldest = this.audioCache.keys().next().value;
        if (oldest !== undefined) this.audioCache.delete(oldest);
      }
      this.audioCache.set(cacheKey, dataUrl);

      this.activeAbortController = null;
      await this.playAudioUrl(dataUrl, options, sequenceId);
    } catch (err) {
      if (this.playbackSequence !== sequenceId) return;
      if (err instanceof DOMException && err.name === 'AbortError') return;

      this.activeAbortController = null;
      this.speakWithBrowserFallback(cleanText, options, sequenceId);
    }
  }

  public stop(): void {
    this.playbackSequence++;
    this.speaking = false;

    if (this.activeAbortController) {
      this.activeAbortController.abort();
      this.activeAbortController = null;
    }

    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.src = '';
      this.currentAudio = null;
    }

    if (this.synth) {
      this.synth.cancel();
    }
  }

  public isSpeaking(): boolean {
    return this.speaking;
  }
}

export const speech = new SpeechController();
