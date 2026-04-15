import { useCallback, useEffect, useRef, useState } from "react";
import type { Note } from "@/types/note";

type Props = {
  note: Note | null;
  onContentChange: (content: string) => void;
};

function lineColFromIndex(text: string, index: number): { line: number; col: number } {
  const slice = text.slice(0, Math.min(index, text.length));
  const lines = slice.split("\n");
  return { line: lines.length, col: (lines[lines.length - 1] ?? "").length + 1 };
}

/**
 * 中间 Markdown 源码编辑区与状态栏。
 */
export function EditorPane({ note, onContentChange }: Props) {
  const ta = useRef<HTMLTextAreaElement>(null);
  const [caret, setCaret] = useState({ line: 1, col: 1 });

  const syncCaret = useCallback(() => {
    const el = ta.current;
    if (!el || !note) return;
    setCaret(lineColFromIndex(note.content, el.selectionStart));
  }, [note]);

  useEffect(() => {
    syncCaret();
  }, [note?.id, note?.content, syncCaret]);

  if (!note) {
    return (
      <section className="flex min-h-0 flex-1 flex-col border-r border-white/10 bg-surface">
        <div className="flex flex-1 items-center justify-center text-sm text-white/45">
          无内容可编辑
        </div>
      </section>
    );
  }

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col border-r border-white/10 bg-surface">
      <textarea
        ref={ta}
        value={note.content}
        onChange={(e) => {
          onContentChange(e.target.value);
          queueMicrotask(syncCaret);
        }}
        onSelect={syncCaret}
        onKeyUp={syncCaret}
        onClick={syncCaret}
        spellCheck={false}
        className="min-h-0 flex-1 resize-none bg-transparent p-4 font-mono text-sm leading-relaxed text-white/95 outline-none scroll-smooth md:text-[15px]"
        placeholder="在此编写 Markdown…"
        aria-label="Markdown 编辑器"
      />
      <footer className="flex flex-wrap gap-x-3 gap-y-1 border-t border-white/10 px-3 py-2 text-xs text-white/45">
        <span>
          行 {caret.line}, 列 {caret.col}
        </span>
        <span>UTF-8</span>
        <span>Markdown</span>
      </footer>
    </section>
  );
}
