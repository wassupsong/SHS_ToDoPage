import { Board } from "@/components/board";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import useMakeMainComponent from "../hooks/use-make-main-component";
import { Button } from "@/components/ui";

const MainComponent: React.FC = () => {
  const { boards, onDragEnd, handleAddBoard } = useMakeMainComponent();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Kanban To-Do List</h1>
      <Button onClick={handleAddBoard}>+ Add Board</Button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-boards" direction="horizontal" type="board">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex gap-4 items-start overflow-x-auto py-6"
              id="board-container"
            >
              {boards.map((board, index) => (
                <Board key={board.id} index={index} board={board} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default MainComponent;
