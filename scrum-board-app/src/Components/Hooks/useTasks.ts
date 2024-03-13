import { create } from "zustand";
import { IColumn } from "../../Interfaces/Column";
import { ITask } from "../../Interfaces/Task";
import { StartColumn, StartTasks } from "../../Utils/startData";

interface TaskStore {
  tasks: ITask[];
  createTask: (task: ITask) => void;
  deleteTask: (id: Number) => void;
  columns: IColumn[];
  createNewColumn: (column: IColumn) => void;
  deleteColumn: (id: Number) => void;
}

const useTasks = create<TaskStore>((set) => ({
  tasks: [...StartTasks],
  createTask: (task: ITask) => {
    set((state) => ({ tasks: [...state.tasks, task] }));
  },
  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },
  columns: [...StartColumn],
  createNewColumn: (column: IColumn) =>
    set((state) => ({ columns: [...state.columns, column] })),
  deleteColumn: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.columnId !== id),
    }));
    set((state) => ({
      columns: state.columns.filter((column) => column.id !== id),
    }));
  },
}));

export default useTasks;
