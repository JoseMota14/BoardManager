import { ReactNode } from "react";
import useTasks from "../../Components/Hooks/useTasks";
import { IColumn } from "../../Interfaces/Column";
import { ITask } from "../../Interfaces/Task";
import "./styles.css";

type act = "COLUMN" | "TASK";

interface ButtonProps {
  actName: act;
  name: string;
  columnId?: number;
  action: (el: any) => void;
  children: ReactNode;
  width?: string;
}

function Button(props: ButtonProps) {
  const { tasks, columns } = useTasks();

  const dispatchAction = () => {
    if (props.actName === "TASK") {
      var t: ITask = {
        id: tasks.length,
        columnId: props.columnId!,
        description: "new task",
      };
      props.action(t);
    } else {
      var c: IColumn = {
        id: columns.length,
        title: "new column",
      };
      props.action(c);
    }
  };

  const buttonStyles = {
    width: props.width || "auto", // Default width or custom width
  };

  return (
    <button className="button" style={buttonStyles} onClick={dispatchAction}>
      {props.name}
      <span style={{ paddingLeft: "5px" }}> {props.children}</span>
    </button>
  );
}

export default Button;
