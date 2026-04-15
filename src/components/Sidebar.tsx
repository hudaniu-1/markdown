import { useMemo, useState } from "react";
import type { Note } from "@/types/note";
import { formatRelativeTime, formatSizeBytes } from "@/utils/noteFormat";

type Props = {
  notes: Note[];
  activeId: string;
  onSelect: (id: string) => void;
  onNew: () => void;
  /** 移动端关闭抽屉 */
  onNavigate?: () => void;
};

/**
 * 左侧：品牌、搜索、笔记列表、新建按钮。
 */
export function Sidebar({
  notes,
  activeId,
  onSelect,
  onNew,
  onNavigate,
}: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
    );
  }, [notes, query]);

  return (
    <aside className="flex h-full w-full flex-col border-r border-white/10 bg-surface-raised md:w-72">
      <div className="border-b border-white/10 p-4">
        <h1 className="bg-clip-text font-bold tracking-wide text-transparent bg-accent-gradient">
          MARKDOWN NOTES
        </h1>
        <p className="mt-1 text-xs text-white/45">本地笔记本</p>
      </div>

      <div className="p-3">
        <label className="sr-only" htmlFor="note-search">
          搜索笔记
        </label>
        <input
          id="note-search"
          type="search"
          placeholder="搜索笔记..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-surface-muted px-3 py-2 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30"
        />
      </div>

      <nav
        className="min-h-0 flex-1 overflow-y-auto scroll-smooth px-2 pb-2"
        aria-label="笔记列表"
      >
        <ul className="space-y-1">
          {filtered.map((note) => {
            const active = note.id === activeId;
            const preview = `${note.title}${note.content}`.slice(0, 2000);
            return (
              <li key={note.id}>
                <button
                  type="button"
                  onClick={() => {
                    onSelect(note.id);
                    onNavigate?.();
                  }}
                  className={`w-full rounded-lg border px-3 py-2.5 text-left transition ${
                    active
                      ? "border-transparent bg-gradient-to-r from-cyan-500/20 via-violet-500/15 to-fuchsia-500/20 ring-1 ring-cyan-400/50"
                      : "border-transparent hover:bg-white/5"
                  }`}
                >
                  <div
                    className={`truncate text-sm font-medium ${
                      active
                        ? "bg-clip-text text-transparent bg-accent-gradient"
                        : "text-white/90"
                    }`}
                  >
                    {note.title || "未命名笔记"}
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-white/40">
                    <span>{formatSizeBytes(preview)}</span>
                    <span>·</span>
                    <span>{formatRelativeTime(note.updatedAt)}</span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
        {filtered.length === 0 && (
          <p className="px-2 py-6 text-center text-sm text-white/45">
            没有匹配的笔记
          </p>
        )}
      </nav>

      <div className="border-t border-white/10 p-3">
        <button
          type="button"
          onClick={() => {
            onNew();
            onNavigate?.();
          }}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent-gradient px-3 py-3 text-sm font-semibold text-surface shadow-lg shadow-cyan-500/10 transition hover:opacity-95 active:scale-[0.99]"
        >
          <span aria-hidden>+</span>
          新建笔记
        </button>
      </div>
    </aside>
  );
}
