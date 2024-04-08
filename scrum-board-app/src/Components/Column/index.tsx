import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { IColumn } from "../../Interfaces/Column";
import { ITask } from "../../Interfaces/Task";
import Button from "../../Shared/Button";
import useTasks from "../Hooks/useTasks";
import Task from "../Task";
import "./styles.css";

interface ColumnProps {
  tasks: ITask[];
  column: IColumn;
}

function Column(props: ColumnProps) {
  const { deleteColumn, createTask, tasks } = useTasks();
  const [editMode, setEditMode] = useState<boolean>(false);
  const deleteHelper = () => {
    deleteColumn(props.column.id);
  };

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props.column.id,
    data: {
      type: "Column",
      column: props.column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <ul className="columns">
      <div className="wrapper">
        <h4>{props.column.title}</h4>
        <MdDeleteOutline
          color="#1DB954"
          size="30px"
          onClick={() => deleteHelper()}
          style={{ cursor: "pointer" }}
        />
      </div>

      {props.tasks.map((el) => {
        return <Task task={el}></Task>;
      })}
      <div className="button_wrapper">
        <Button
          actName="TASK"
          name="Add"
          columnId={props.column.id}
          action={createTask}
          width="100%"
        >
          <IoMdAdd color="#1db954" />
        </Button>
      </div>
    </ul>
  );
}

export default Column;
