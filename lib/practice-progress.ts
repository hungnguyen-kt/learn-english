function progressKey(typeId: string, lessonId: string) {
  return `learn-english.practice.${typeId}.${lessonId}`;
}

export function isLessonCompleted(typeId: string, lessonId: string) {
  return localStorage.getItem(progressKey(typeId, lessonId)) === "completed";
}

export function markLessonCompleted(typeId: string, lessonId: string) {
  localStorage.setItem(progressKey(typeId, lessonId), "completed");
}
