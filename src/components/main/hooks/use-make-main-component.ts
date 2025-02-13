import { useBoardStore } from "@/store/board-store";
import { DropResult } from "@hello-pangea/dnd";

const useMakeMainComponent = () => {
  const { boards, reorderBoards, moveTodo, addBoard } = useBoardStore();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === "board") {
      reorderBoards(source.index, destination.index);
      return;
    }

    moveTodo(source.droppableId, destination.droppableId, source.index, destination.index);
  };

  const handleAddBoard = () => {
    addBoard();
    setTimeout(() => {
      const boardContainer = document.getElementById("board-container");
      if (boardContainer) {
        boardContainer.scrollLeft = boardContainer.scrollWidth;
      }
    }, 0);
  };

  return { boards, onDragEnd, handleAddBoard };
};

export default useMakeMainComponent;
