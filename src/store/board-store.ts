import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";
import { BoardType } from "@/types";

interface BoardStore {
  boards: BoardType[];
  addBoard: (title?: string) => void;
  updateBoard: (id: string, title?: string) => void;
  deleteBoard: (id: string) => void;
  addTodo: (boardId: string, content?: string) => void;
  updateTodo: (boardId: string, todoId: string, content?: string) => void;
  deleteTodo: (boardId: string, todoId: string) => void;
  reorderBoards: (startIndex: number, endIndex: number) => void;
  moveTodo: (
    sourceBoardId: string,
    destBoardId: string,
    sourceIndex: number,
    destIndex: number,
  ) => void;
}

export const useBoardStore = create<BoardStore>()(
  persist(
    (set) => ({
      boards: [],
      addBoard: (title) =>
        set((state) => ({
          boards: [...state.boards, { id: nanoid(), title: title ?? "New Board", todos: [] }],
        })),
      updateBoard: (id, title) =>
        set((state) => ({
          boards: state.boards.map((board) => (board.id === id ? { ...board, title } : board)),
        })),
      deleteBoard: (id) =>
        set((state) => ({
          boards: state.boards.filter((board) => board.id !== id),
        })),
      addTodo: (boardId, content) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? { ...board, todos: [...board.todos, { id: nanoid(), content }] }
              : board,
          ),
        })),
      updateTodo: (boardId, todoId, content) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  todos: board.todos.map((todo) =>
                    todo.id === todoId ? { ...todo, content } : todo,
                  ),
                }
              : board,
          ),
        })),
      deleteTodo: (boardId, todoId) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  todos: board.todos.filter((todo) => todo.id !== todoId),
                }
              : board,
          ),
        })),
      reorderBoards: (startIndex, endIndex) =>
        set((state) => {
          const newBoards = Array.from(state.boards);
          const [reorderedBoard] = newBoards.splice(startIndex, 1);
          newBoards.splice(endIndex, 0, reorderedBoard);
          return { boards: newBoards };
        }),
      moveTodo: (sourceBoardId, destBoardId, sourceIndex, destIndex) =>
        set((state) => {
          const newBoards = state.boards.map((board) => {
            if (board.id === sourceBoardId) {
              const newTodos = Array.from(board.todos);
              const [movedTodo] = newTodos.splice(sourceIndex, 1);
              if (sourceBoardId === destBoardId) {
                newTodos.splice(destIndex, 0, movedTodo);
              }
              return { ...board, todos: newTodos };
            }
            if (board.id === destBoardId && sourceBoardId !== destBoardId) {
              const newTodos = Array.from(board.todos);
              const movedTodo = state.boards.find((b) => b.id === sourceBoardId)?.todos[
                sourceIndex
              ];
              if (movedTodo) {
                newTodos.splice(destIndex, 0, movedTodo);
              }
              return { ...board, todos: newTodos };
            }
            return board;
          });
          return { boards: newBoards };
        }),
    }),
    {
      name: "board-storage",
    },
  ),
);
