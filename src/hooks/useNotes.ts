import { useCallback, useEffect, useMemo, useState } from "react";
import type { Note } from "@/types/note";
import { loadNotes, saveNotes } from "@/utils/storage";

const DEMO_NOTE: Note = {
  id: "demo-1",
  title: "Vibe Coding 学习笔记",
  content: `# Vibe Coding 学习笔记

## 什么是 Vibe Coding？

一种借助 AI 辅助、以「氛围」驱动的开发方式，强调快速迭代与持续对话。

## 核心优势

- **快速开发**：减少样板与重复劳动
- **降低门槛**：新手也能搭出可用原型
- **持续学习**：在对话中沉淀模式与最佳实践

## 开发流程

1. 明确需求与边界
2. 编写 PRD / 技术说明
3. 与 AI 结对实现与重构
4. 测试、优化与文档化

## 实战技巧

\`\`\`ts
function greet(name: string) {
  return \`Hello, \${name}\`;
}
\`\`\`

更多可参考 [Markdown 指南](https://commonmark.org/help/)。
`,
  updatedAt: Date.now(),
};

function createEmptyNote(): Note {
  const id =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `n-${Date.now()}`;
  return {
    id,
    title: "未命名笔记",
    content: "",
    updatedAt: Date.now(),
  };
}

function initialNotesAndActive(): { notes: Note[]; activeId: string } {
  const stored = loadNotes();
  const notes = stored !== null ? stored : [DEMO_NOTE];
  return { notes, activeId: notes[0]?.id ?? "" };
}

/** 笔记列表的增删改与本地持久化 */
export function useNotes() {
  const [{ notes, activeId }, setBoth] = useState(initialNotesAndActive);

  const setActiveId = useCallback((id: string) => {
    setBoth((prev) => ({ ...prev, activeId: id }));
  }, []);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const activeNote = useMemo(
    () => notes.find((n) => n.id === activeId) ?? null,
    [notes, activeId]
  );

  const addNote = useCallback(() => {
    const note = createEmptyNote();
    setBoth((prev) => ({
      notes: [note, ...prev.notes],
      activeId: note.id,
    }));
  }, []);

  const deleteNote = useCallback((id: string) => {
    setBoth((prev) => {
      const next = prev.notes.filter((n) => n.id !== id);
      const nextActive =
        prev.activeId === id ? next[0]?.id ?? "" : prev.activeId;
      return { notes: next, activeId: nextActive };
    });
  }, []);

  const updateNote = useCallback((id: string, patch: Partial<Note>) => {
    setBoth((prev) => ({
      ...prev,
      notes: prev.notes.map((n) =>
        n.id === id ? { ...n, ...patch, updatedAt: Date.now() } : n
      ),
    }));
  }, []);

  return {
    notes,
    activeId,
    setActiveId,
    activeNote,
    addNote,
    deleteNote,
    updateNote,
  };
}
