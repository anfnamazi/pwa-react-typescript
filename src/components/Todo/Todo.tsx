import { FunctionComponent } from "react";
import useTodo from "./hooks/useTodo";

interface TodoProps {}

const Todo: FunctionComponent<TodoProps> = () => {
  const { tasks, handleSubmit, handleRemove } = useTodo();
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="todo" name="todo" />
        <button type="submit">&#10147;</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li>
            {task.title}
            <button onClick={handleRemove(task.date)}>&#10006;</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todo;
