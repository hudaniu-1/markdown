import { useCallback, useState } from "react";
import { EditorPane } from "@/components/EditorPane";
import { PreviewPane } from "@/components/PreviewPane";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { useNotes } from "@/hooks/useNotes";

/**
 * 三栏布局：侧栏 | 编辑 + 预览；移动端侧栏抽屉。
 */
export default function App() {
  const {
    notes,
    activeId,
    setActiveId,
    activeNote,
    addNote,
    deleteNote,
    updateNote,
  } = useNotes();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleTitle = useCallback(
    (title: string) => {
      if (!activeNote) return;
      updateNote(activeNote.id, { title });
    },
    [activeNote, updateNote]
  );

  const handleContent = useCallback(
    (content: string) => {
      if (!activeNote) return;
      updateNote(activeNote.id, { content });
    },
    [activeNote, updateNote]
  );

  const handleDelete = useCallback(() => {
    if (!activeNote) return;
    deleteNote(activeNote.id);
  }, [activeNote, deleteNote]);

  return (
    <div className="flex h-[100dvh] flex-col bg-surface text-white md:flex-row">
      {/* 移动端侧栏遮罩 */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="关闭菜单"
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-[min(100%,20rem)] transform transition-transform duration-200 ease-out md:static md:z-0 md:w-72 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          notes={notes}
          activeId={activeId}
          onSelect={setActiveId}
          onNew={addNote}
          onNavigate={() => setSidebarOpen(false)}
        />
      </div>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <TopBar
          note={activeNote}
          onTitleChange={handleTitle}
          onDelete={handleDelete}
          onOpenSidebar={() => setSidebarOpen(true)}
        />

        <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
          <EditorPane note={activeNote} onContentChange={handleContent} />
          <PreviewPane note={activeNote} />
        </div>
      </div>
    </div>
  );
}
