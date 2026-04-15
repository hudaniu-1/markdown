import { useEffect, useState } from "react";
import type { Note } from "@/types/note";
import { countChars } from "@/utils/noteFormat";
import { MarkdownPreview } from "./MarkdownPreview";

type Props = {
  note: Note | null;
};

/**
 * 右侧实时预览与字数、保存状态。
 */
export function PreviewPane({ note }: Props) {
  const [saveLabel, setSaveLabel] = useState("已保存");

  useEffect(() => {
    if (!note) return;
    setSaveLabel("保存中…");
    const t = window.setTimeout(() => setSaveLabel("已保存"), 400);
    return () => window.clearTimeout(t);
  }, [note?.id, note?.title, note?.content, note?.updatedAt]);

  if (!note) {
    return (
      <section className="flex min-h-0 min-w-0 flex-[1] flex-col bg-surface-muted/40">
        <div className="flex flex-1 items-center justify-center text-sm text-white/45">
          预览将显示在这里
        </div>
      </section>
    );
  }

  const body = `# ${note.title}\n\n${note.content}`;
  const chars = countChars(body);

  return (
    <section
      id="print-preview"
      className="flex min-h-0 min-w-0 flex-1 flex-col bg-surface-muted/40"
    >
      <div className="min-h-0 flex-1 overflow-y-auto scroll-smooth p-4 md:p-5">
        <MarkdownPreview markdown={body} />
      </div>
      <footer className="flex flex-wrap justify-end gap-3 border-t border-white/10 px-3 py-2 text-xs text-white/45">
        <span>字数: {chars}</span>
        <span>{saveLabel}</span>
      </footer>
    </section>
  );
}
