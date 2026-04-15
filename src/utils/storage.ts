import type { Note } from "@/types/note";

const KEY = "markdown-notes:v1";

export function loadNotes(): Note[] | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return null;
    return parsed as Note[];
  } catch {
    return null;
  }
}

export function saveNotes(notes: Note[]): void {
  localStorage.setItem(KEY, JSON.stringify(notes));
}
