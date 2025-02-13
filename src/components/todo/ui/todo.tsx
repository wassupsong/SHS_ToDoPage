import { Draggable } from "@hello-pangea/dnd";
import { TodoType } from "@/types";
import { Check, Edit2, Trash2 } from "lucide-react";
import { Button, Textarea } from "@/components/ui";
import useMakeTodo from "../hooks/use-make-todo";

interface TodoProps {
  todo: TodoType;
  index: number;
  boardId: string;
}

const Todo: React.FC<TodoProps> = (props) => {
  const { todo, index, boardId } = props;
  const { isEditing, content, handleUpdateTodo, handleClickEdit, handleChangeContent, deleteTodo } =
    useMakeTodo({ boardId, todo });

  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="bg-yellow-200 p-3 mb-2 rounded"
        >
          <div className="space-y-4">
            <div className="w-full h-1 bg-green-500" />
            <Textarea
              value={content}
              onChange={handleChangeContent}
              className="flex-grow mb-2 bg-transparent border-b border-gray-400 focus:outline-none focus:border-gray-600 resize-none"
              readOnly={!isEditing}
              autoFocus
            />

            <div className="flex items-center justify-end">
              {isEditing ? (
                <Button onClick={handleUpdateTodo} variant="ghost" size="icon">
                  <Check className="text-green-500" />
                </Button>
              ) : (
                <Button onClick={handleClickEdit} variant="ghost" size="icon">
                  <Edit2 className="text-blue-500" />
                </Button>
              )}
              <Button onClick={() => deleteTodo(boardId, todo.id)} variant="ghost" size="icon">
                <Trash2 className="text-red-500" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Todo;
