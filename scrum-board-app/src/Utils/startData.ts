import { IColumn } from "../Interfaces/Column";
import { ITask } from "../Interfaces/Task";

export const StartColumn: IColumn[] = [
  {
    id: 1,
    title: "Todo",
  },
  {
    id: 2,
    title: "Work in progress",
  },
  {
    id: 3,
    title: "Done",
  },
];

export const StartTasks: ITask[] = [
  {
    id: 1,
    columnId: 1,
    description: "List admin APIs for dashboard",
  },

  {
    id: 2,
    columnId: 2,
    description: "Conduct security testing",
  },
  {
    id: 3,
    columnId: 2,
    description: "Analyze competitors",
  },
  {
    id: 4,
    columnId: 3,
    description: "Create UI kit documentation",
  },
];
