import { act, renderHook } from "@testing-library/react";
import { useBoardStore } from "./board-store";

jest.mock("nanoid", () => ({
  nanoid: jest.fn(() => "mocked-id"),
}));

describe("useBoardStore", () => {
  afterEach(() => {
    act(() => {
      useBoardStore.setState({ boards: [] });
    });
  });

  test("초기 상태는 빈 배열이어야 한다", () => {
    const { boards } = useBoardStore.getState();
    expect(boards).toEqual([]);
  });

  test("새로운 보드를 추가할 수 있어야 한다", () => {
    const { result } = renderHook(() => useBoardStore());

    act(() => {
      result.current.addBoard("My Board");
    });

    expect(result.current.boards).toHaveLength(1);
    expect(result.current.boards[0]).toEqual({
      id: "mocked-id",
      title: "My Board",
      todos: [],
    });
  });

  test("보드를 업데이트할 수 있어야 한다", () => {
    const { result } = renderHook(() => useBoardStore());

    act(() => {
      result.current.addBoard("Old Title");
    });

    act(() => {
      result.current.updateBoard("mocked-id", "New Title");
    });

    expect(result.current.boards[0].title).toBe("New Title");
  });

  test("보드를 삭제할 수 있어야 한다", () => {
    const { result } = renderHook(() => useBoardStore());

    act(() => {
      result.current.addBoard("Board to Delete");
    });

    act(() => {
      result.current.deleteBoard("mocked-id");
    });

    expect(result.current.boards).toHaveLength(0);
  });

  test("할 일을 추가할 수 있어야 한다", () => {
    const { result } = renderHook(() => useBoardStore());

    act(() => {
      result.current.addBoard("Board");
    });

    act(() => {
      result.current.addTodo("mocked-id", "New Todo");
    });

    expect(result.current.boards[0].todos).toHaveLength(1);
    expect(result.current.boards[0].todos[0]).toEqual({
      id: "mocked-id",
      content: "New Todo",
    });
  });

  test("할 일을 업데이트할 수 있어야 한다", () => {
    const { result } = renderHook(() => useBoardStore());

    act(() => {
      result.current.addBoard("Board");
    });

    act(() => {
      result.current.addTodo("mocked-id", "Old Todo");
    });

    act(() => {
      result.current.updateTodo("mocked-id", "mocked-id", "Updated Todo");
    });

    expect(result.current.boards[0].todos[0].content).toBe("Updated Todo");
  });

  test("할 일을 삭제할 수 있어야 한다", () => {
    const { result } = renderHook(() => useBoardStore());

    act(() => {
      result.current.addBoard("Board");
    });

    act(() => {
      result.current.addTodo("mocked-id", "Todo to Delete");
    });

    act(() => {
      result.current.deleteTodo("mocked-id", "mocked-id");
    });

    expect(result.current.boards[0].todos).toHaveLength(0);
  });

  test("보드를 재정렬할 수 있어야 한다", () => {
    const { result } = renderHook(() => useBoardStore());

    act(() => {
      result.current.addBoard("Board 1");
      result.current.addBoard("Board 2");
    });

    act(() => {
      result.current.reorderBoards(0, 1);
    });

    expect(result.current.boards[0].title).toBe("Board 2");
    expect(result.current.boards[1].title).toBe("Board 1");
  });

  test("할 일을 다른 보드로 이동할 수 있어야 한다", () => {
    const { result } = renderHook(() => useBoardStore());

    act(() => {
      result.current.addBoard("Source Board");
      result.current.addBoard("Destination Board");
      // id 재설정 필요 (nanoid)
      useBoardStore.setState((state) => ({
        boards: state.boards.map((board) =>
          board.title === "Destination Board"
            ? {
                id: "mocked-id-2",
                title: "Destination Board",
                todos: [],
              }
            : board,
        ),
      }));
    });

    act(() => {
      result.current.addTodo("mocked-id", "Todo to Move");
    });

    act(() => {
      result.current.moveTodo("mocked-id", "mocked-id-2", 0, 0);
    });

    expect(result.current.boards[0].todos).toHaveLength(0);
    expect(result.current.boards[1].todos).toHaveLength(1);
    expect(result.current.boards[1].todos[0].content).toBe("Todo to Move");
  });
});
