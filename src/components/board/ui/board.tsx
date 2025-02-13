import { Draggable, Droppable } from "@hello-pangea/dnd";
import { BoardType } from "@/types";
import { Check, Edit2, Trash2 } from "lucide-react";
import { Todo } from "@/components/todo";
import { Button, Input } from "@/components/ui";
import useMakeBoard from "../hooks/use-make-board";

interface BoardProps {
  board: BoardType;
  index: number;
}

const Board: React.FC<BoardProps> = (props) => {
  const { board, index } = props;
  const {
    isEditing,
    title,
    handleUpdateBoard,
    handleAddTodo,
    deleteBoard,
    handleClickEdit,
    handleChangeTitle,
  } = useMakeBoard(board);

  return (
    <Draggable draggableId={board.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="bg-white rounded-lg shadow-md p-4 w-80 flex-none"
        >
          <div {...provided.dragHandleProps} className="mb-4">
            {isEditing ? (
              <div className="flex items-center mb-2">
                <Input
                  type="text"
                  value={title}
                  onChange={handleChangeTitle}
                  className="flex-grow mr-2 p-1 border rounded"
                />
                <Button onClick={handleUpdateBoard} variant="ghost" size="icon">
                  <Check className="text-green-500" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold">{board.title}</h2>
                <div>
                  <Button onClick={handleClickEdit} variant="ghost" size="icon">
                    <Edit2 className="text-blue-500" />
                  </Button>
                  <Button onClick={() => deleteBoard(board.id)} variant="ghost" size="icon">
                    <Trash2 className="text-red-500" />
                  </Button>
                </div>
              </div>
            )}
          </div>
          <Droppable droppableId={board.id} type="todo">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {board.todos.map((todo, index) => (
                  <Todo key={todo.id} todo={todo} index={index} boardId={board.id} />
                ))}
                {provided.placeholder}
                <div className="mt-4">
                  <Button onClick={handleAddTodo} className="w-full py-2" variant="outline">
                    + Add Todo
                  </Button>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Board;
