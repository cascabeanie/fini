export type todoType = {
  todoId?: string;
  todoCategory: string;
  todoTitle: string;
  todoNotes: string;
  todoDeadline: string;
  todoPriority: "low" | "medium" | "high";
  todoCompleted?: boolean;
  userId?: string;
};
