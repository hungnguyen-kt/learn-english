function progressKey(typeId: string, lessonId: string): string {
  return `learn-english.practice.${typeId}.${lessonId}`;
}

function safeGetItem(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignore storage quota or permission errors
  }
}

function safeRemoveItem(key: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore storage errors
  }
}

export function isLessonCompleted(typeId: string, lessonId: string): boolean {
  return safeGetItem(progressKey(typeId, lessonId)) === "completed";
}

export function markLessonCompleted(typeId: string, lessonId: string): void {
  safeSetItem(progressKey(typeId, lessonId), "completed");
}

export function resetLessonCompleted(typeId: string, lessonId: string): void {
  safeRemoveItem(progressKey(typeId, lessonId));
}

export function getCompletedLessonIds(typeId: string, lessonIds: string[]): string[] {
  return lessonIds.filter((lessonId) => isLessonCompleted(typeId, lessonId));
}
