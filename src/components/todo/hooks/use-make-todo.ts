import { useBoardStore } from "@/store/board-store";
import { TodoType } from "@/types";
import { useState } from "react";

interface Props {
  boardId: string;
  todo: TodoType;
}

const useMakeTodo = (props: Props) => {
  const { boardId, todo } = props;
  const { updateTodo, deleteTodo } = useBoardStore();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(todo.content);

  const handleUpdateTodo = () => {
    updateTodo(boardId, todo.id, content);
    setIsEditing(false);
  };

  const handleClickEdit = () => {
    setIsEditing(true);
  };

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return {
    isEditing,
    content,
    handleUpdateTodo,
    handleClickEdit,
    handleChangeContent,
    deleteTodo,
  };
};

export default useMakeTodo;
