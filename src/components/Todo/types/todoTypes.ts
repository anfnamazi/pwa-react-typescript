export interface ITask {
  title: string;
  completed: boolean;
  date: number;
}

export enum SortEnum {
  NONE,
  DESC,
  ASC,
}

export enum StatusEnum {
  ALL = "ALL",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
}
