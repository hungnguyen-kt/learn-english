export type SpeechOptions = {
  lang?: string;
  onEnd?: () => void;
  onError?: (event: SpeechSynthesisErrorEvent) => void;
};

export function canSpeak(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function stopSpeech(): void {
  if (!canSpeak()) return;
  window.speechSynthesis.cancel();
}

export function speak(text: string, options: SpeechOptions = {}): void {
  if (!canSpeak()) return;
  const { lang = "en-US", onEnd, onError } = options;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  if (onEnd) utterance.onend = onEnd;
  if (onError) utterance.onerror = onError;

  window.speechSynthesis.speak(utterance);
}
