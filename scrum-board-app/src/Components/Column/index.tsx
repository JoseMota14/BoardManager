import { MdDeleteOutline } from "react-icons/md";
import { IColumn } from "../../Interfaces/Column";
import { ITask } from "../../Interfaces/Task";
import useTasks from "../Hooks/useTasks";
import Task from "../Task";
import "./styles.css";

interface ColumnProps {
  tasks: ITask[];
  column: IColumn;
}

function Column(props: ColumnProps) {
  const { deleteColumn } = useTasks();

  const deleteHelper = () => {
    deleteColumn(props.column.id);
    console.log("delete");
  };

  return (
    <ul className="columns">
      <div className="wrapper">
        <h4>Column</h4>
        <MdDeleteOutline
          color="#1DB954"
          size="30px"
          onClick={() => deleteHelper()}
          style={{ cursor: "pointer" }}
        />
      </div>

      {props.tasks.map((el) => {
        return <Task></Task>;
      })}
    </ul>
  );
}

export default Column;
