export interface UserTask {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface UserTaskFormatted extends UserTask {
  userName?: string;
}

export type UserTaskResponse = UserTask[];
