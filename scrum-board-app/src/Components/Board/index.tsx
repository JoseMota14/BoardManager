import { useMemo } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { ITask } from "../../Interfaces/Task";
import Column from "../Column";
import useTasks from "../Hooks/useTasks";
import "./styles.css";

function Board() {
  const { columns, tasks } = useTasks();

  const getColumn = useMemo(() => {
    if (columns === undefined) {
      return [];
    }
    return columns;
  }, [columns]);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  return (
    <div className="container">
      <h1>Kanban</h1>
      <div className="columns_container">
        {getColumn.map((el) => {
          return (
            <Column
              key={el.id}
              column={el}
              tasks={tasks.filter((t: ITask) => t.columnId === el.id)}
            ></Column>
          );
        })}
        <IoIosAddCircleOutline color="#1DB954" size={"30px"} />
      </div>
    </div>
  );
}

export default Board;
