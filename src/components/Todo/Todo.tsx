import { FunctionComponent } from "react";
import useTodo from "./hooks/useTodo";
import { StatusEnum } from "./types/todoTypes";

interface TodoProps {}

const Todo: FunctionComponent<TodoProps> = () => {
  const {
    visibleTasks,
    handleSubmit,
    handleRemove,
    handleChangeCheckbox,
    handleChangeSort,
    SortCondition,
    handleChangeStatus,
  } = useTodo();
  return (
    <>
      <div style={{ display: "flex", gap: 8 }}>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="todo" name="todo" />
          <button type="submit">&#10147;</button>
        </form>
        <button onClick={handleChangeSort}>
          date{" "}
          <span dangerouslySetInnerHTML={{ __html: SortCondition() }}></span>
        </button>
      </div>
      <ul>
        {visibleTasks.map((task) => (
          <li>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleChangeCheckbox(task.date)}
            />
            {task.title}
            <button onClick={handleRemove(task.date)}>&#10006;</button>
          </li>
        ))}
      </ul>
      <div>
        {Object.values(StatusEnum).map((i) => (
          <button onClick={handleChangeStatus(i)}>{i}</button>
        ))}
      </div>
    </>
  );
};

export default Todo;
