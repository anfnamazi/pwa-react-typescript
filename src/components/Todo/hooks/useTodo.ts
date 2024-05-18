import { SyntheticEvent, useState } from "react";
import { ITask } from "../types/todoTypes";

interface IUseTodo {
  (): {
    tasks: ITask[];
    handleSubmit: (e: SyntheticEvent) => void;
    handleRemove: (date: number) => () => void;
  };
}

const useTodo: IUseTodo = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  /* #region Create */
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      todo: { value: string };
    };
    const title = target.todo.value.trim();
    const date = Date.now();
    const task = { title, completed: false, date };
    setTasks((prev) => [...prev, task]);
  };

  /* #endregion */

  /* #region Delete */
  const handleRemove = (date: number) => {
    // use closure to enhance performance by avoiding from inline callback
    // can use different key like id or something else but i prefer to use date
    return () => {
      setTasks((prev) => prev.filter((t) => t.date !== date));
    };
  };
  /* #endregion */

  return { tasks, handleSubmit, handleRemove };
};

export default useTodo;
