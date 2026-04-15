import type { Note } from "@/types/note";

/** 导出为 .md 文件 */
export function exportMarkdownFile(note: Note): void {
  const blob = new Blob([`# ${note.title}\n\n${note.content}`], {
    type: "text/markdown;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${sanitizeFileName(note.title)}.md`;
  a.click();
  URL.revokeObjectURL(url);
}

function sanitizeFileName(name: string): string {
  return name.replace(/[/\\?%*:|"<>]/g, "-").slice(0, 80) || "note";
}

/**
 * 导出 PDF：打开打印对话框，用户可选择「另存为 PDF」。
 * 依赖浏览器打印样式（见 index.css 末尾 @media print）。
 */
export function exportPdfViaPrint(): void {
  window.print();
}
