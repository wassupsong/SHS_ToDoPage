import { useState } from "react";
import { useBoardStore } from "@/store/board-store";
import { BoardType } from "@/types";

const useMakeBoard = (board: BoardType) => {
  const { updateBoard, deleteBoard, addTodo } = useBoardStore();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(board.title);

  const handleUpdateBoard = () => {
    updateBoard(board.id, title);
    setIsEditing(false);
  };

  const handleAddTodo = () => {
    addTodo(board.id);
  };

  const handleClickEdit = () => {
    setIsEditing(true);
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return {
    isEditing,
    title,
    handleUpdateBoard,
    handleAddTodo,
    deleteBoard,
    handleClickEdit,
    handleChangeTitle,
  };
};

export default useMakeBoard;
