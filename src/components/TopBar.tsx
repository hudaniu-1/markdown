import type { Note } from "@/types/note";
import { exportMarkdownFile, exportPdfViaPrint } from "@/utils/exportNote";

type Props = {
  note: Note | null;
  onTitleChange: (title: string) => void;
  onDelete: () => void;
  /** 移动端打开侧栏 */
  onOpenSidebar?: () => void;
};

/**
 * 顶栏：标题编辑、导出与删除。
 */
export function TopBar({
  note,
  onTitleChange,
  onDelete,
  onOpenSidebar,
}: Props) {
  if (!note) {
    return (
      <header className="flex h-14 shrink-0 items-center border-b border-white/10 bg-surface-muted/80 px-3 backdrop-blur md:px-4">
        {onOpenSidebar && (
          <button
            type="button"
            className="mr-2 rounded-md border border-white/15 px-2 py-1 text-sm text-white/80 md:hidden"
            onClick={onOpenSidebar}
            aria-label="打开菜单"
          >
            菜单
          </button>
        )}
        <span className="text-sm text-white/50">请选择或新建一条笔记</span>
      </header>
    );
  }

  return (
    <header className="flex h-14 shrink-0 flex-wrap items-center gap-2 border-b border-white/10 bg-surface-muted/80 px-3 py-2 backdrop-blur md:flex-nowrap md:px-4">
      {onOpenSidebar && (
        <button
          type="button"
          className="rounded-md border border-white/15 px-2 py-1 text-sm text-white/80 md:hidden"
          onClick={onOpenSidebar}
          aria-label="打开菜单"
        >
          菜单
        </button>
      )}
      <input
        aria-label="笔记标题"
        value={note.title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="min-w-0 flex-1 border-none bg-transparent text-base font-semibold text-white outline-none placeholder:text-white/35 md:text-lg"
        placeholder="笔记标题"
      />
      <div className="flex w-full shrink-0 flex-wrap justify-end gap-2 md:w-auto">
        <button
          type="button"
          className="rounded-md border border-white/20 px-3 py-1.5 text-xs text-white/85 transition hover:bg-white/10 md:text-sm"
          onClick={() => exportMarkdownFile(note)}
        >
          导出 MD
        </button>
        <button
          type="button"
          className="rounded-md border border-white/20 px-3 py-1.5 text-xs text-white/85 transition hover:bg-white/10 md:text-sm"
          onClick={() => exportPdfViaPrint()}
        >
          导出 PDF
        </button>
        <button
          type="button"
          className="rounded-md border border-red-400/40 px-3 py-1.5 text-xs text-red-300 transition hover:bg-red-500/10 md:text-sm"
          onClick={() => {
            if (window.confirm("确定删除这条笔记？")) onDelete();
          }}
        >
          删除
        </button>
      </div>
    </header>
  );
}
