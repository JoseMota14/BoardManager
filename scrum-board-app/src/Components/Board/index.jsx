import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useMemo } from "react";
import { createPortal } from "react-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IColumn } from "../../Interfaces/Column";
import { ITask } from "../../Interfaces/Task";
import Button from "../../Shared/Button";
import Column from "../Column";
import useTasks from "../Hooks/useTasks";
import Task from "../Task";
import "./styles.css";

function Board() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const {
    columns,
    tasks,
    activeColumn,
    activeTask,
    createNewColumn,
    setActiveColumn,
    setActiveTask,
    setTasks,
    setColumns,
  } = useTasks();

  const getColumn = useMemo(() => {
    if (columns === undefined) {
      return [];
    }
    return columns;
  }, [columns]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
    } else if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    setColumns(
      reorderColumn(
        columns,
        isNumber(activeId) ? activeId.toString() : String(activeId),
        isNumber(overId) ? overId.toString() : String(overId)
      )
    );
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";
    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveATask && isOverATask) {
      setTasks(
        reorderTasksDiferentOver(
          tasks,
          isNumber(activeId) ? activeId.toString() : String(activeId),
          isNumber(overId) ? overId.toString() : String(overId)
        )
      );
    }

    if (isActiveATask && isOverAColumn) {
      setTasks(
        reorderTasks(
          tasks,
          isNumber(activeId) ? activeId.toString() : String(activeId),
          isNumber(overId) ? overId.toString() : String(overId)
        )
      );
    }
  }

  function isNumber(value: unknown): value is number {
    return typeof value === "number";
  }

  const reorderColumn = (
    columns: IColumn[],
    activeIdAsString: string,
    overIdAsString: string
  ) => {
    const activeId = parseInt(activeIdAsString, 10);
    const overId = parseInt(overIdAsString, 10);
    const activeColumnIndex = columns.findIndex(
      (col: IColumn) => col.id === activeId
    );
    const overColumnIndex = columns.findIndex(
      (col: IColumn) => col.id === overId
    );
    return arrayMove(columns, activeColumnIndex, overColumnIndex) as IColumn[];
  };

  const reorderTasksDiferentOver = (
    tasks: ITask[],
    activeIdAsString: string,
    overIdAsString: string
  ) => {
    const activeId = parseInt(activeIdAsString, 10);
    const overId = parseInt(overIdAsString, 10);
    const activeIndex = tasks.findIndex((t: ITask) => t.id === activeId);
    const overIndex = tasks.findIndex((t: ITask) => t.id === overId);

    if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
      tasks[activeIndex].columnId = tasks[overIndex].columnId;
      return arrayMove(tasks, activeIndex, overIndex - 1);
    }

    return arrayMove(tasks, activeIndex, overIndex) as ITask[];
  };

  const reorderTasks = (
    tasks: ITask[],
    activeIdAsString: string,
    overIdAsString: string
  ): ITask[] => {
    const activeId = parseInt(activeIdAsString, 10);
    const overId = parseInt(overIdAsString, 10);
    const activeColumnIndex = tasks.findIndex(
      (task: ITask) => task.id === activeId
    );
    const overColumnIndex = tasks.findIndex(
      (task: ITask) => task.id === overId
    );
    return arrayMove(tasks, activeColumnIndex, overColumnIndex);
  };

  return (
    <div className="container">
      <h1>Kanban</h1>
      <div className="columns_container">
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
        >
          <SortableContext items={columnsId}>
            {getColumn.map((el) => (
              <Column
                key={el.id}
                column={el}
                tasks={tasks.filter((t) => t.columnId === el.id)}
              />
            ))}
          </SortableContext>
          {createPortal(
            <DragOverlay>
              {activeColumn && (
                <Column
                  column={activeColumn}
                  tasks={tasks.filter(
                    (task) => task.columnId === activeColumn.id
                  )}
                />
              )}
              {activeTask && <Task task={activeTask} />}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
        <div className="button-container">
          <Button name="Add" actName="COLUMN" action={createNewColumn}>
            <IoIosAddCircleOutline color="#1DB954" size="30px" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Board;
