import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { ITask } from "../../Interfaces/Task";
import useTasks from "../Hooks/useTasks";
import "./styles.css";

interface TaskProps {
  task: ITask;
}

function Task(props: TaskProps) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(true);

  const { deleteTask, updateTask } = useTasks();

  const updateTaskWrapper = (id: number, value: string) => {
    const t: ITask = {
      id,
      columnId: props.task.columnId,
      description: value,
    };
    updateTask(id, t);
  };

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props.task.id,
    data: {
      type: "Task",
      task: props.task,
    },
    disabled: editMode,
  });

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return <div ref={setNodeRef} style={style} />;
  }

  if (editMode) {
    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <textarea
          value={props.task.description}
          autoFocus
          placeholder="Task content here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              toggleEditMode();
            }
          }}
          onChange={(e) => updateTaskWrapper(props.task.id, e.target.value)}
        />
      </div>
    );
  }

  return (
    <>
      <li
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={toggleEditMode}
        onMouseEnter={() => {
          setMouseIsOver(true);
        }}
        onMouseLeave={() => {
          setMouseIsOver(false);
        }}
        className="task"
      >
        <p>{props.task.description}</p>{" "}
        {mouseIsOver && (
          <MdDeleteOutline
            color="#1DB954"
            size="30px"
            onClick={() => deleteTask(props.task.id)}
            style={{ cursor: "pointer" }}
          />
        )}
      </li>
    </>
  );
}

export default Task;
