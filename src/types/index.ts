export interface TodoType {
  id: string;
  content?: string;
}

export interface BoardType {
  id: string;
  title?: string;
  todos: TodoType[];
}
