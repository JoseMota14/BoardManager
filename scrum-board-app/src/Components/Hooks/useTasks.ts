import { create } from "zustand";
import { IColumn } from "../../Interfaces/Column";
import { ITask } from "../../Interfaces/Task";
import { StartColumn, StartTasks } from "../../Utils/startData";

interface TaskStore {
  tasks: ITask[];
  activeTask: ITask | null;
  setActiveTask: (task: ITask | null) => void;
  updateTask: (taskId: ITask["id"], task: ITask) => void;
  setTasks: (tasks: ITask[]) => void;
  createTask: (task: ITask) => void;
  deleteTask: (id: Number) => void;
  columns: IColumn[];
  activeColumn: IColumn | null;
  setActiveColumn: (column: IColumn | null) => void;
  setColumns: (columns: IColumn[]) => void;
  createNewColumn: (column: IColumn) => void;
  deleteColumn: (id: Number) => void;
}

const useTasks = create<TaskStore>((set) => ({
  tasks: [...StartTasks],
  activeTask: null,
  setActiveTask: (task) => set({ activeTask: task }),
  updateTask: (taskId, task) => {
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, ...task } : t)),
    }));
  },
  setTasks: (tasks) => set({ tasks: tasks }),
  createTask: (task: ITask) => {
    set((state) => ({ tasks: [...state.tasks, task] }));
  },
  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },
  columns: [...StartColumn],
  activeColumn: null,
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
  setActiveColumn: (column) => set({ activeColumn: column }),
  setColumns: (columns) => set({ columns: columns }),
}));

export default useTasks;
