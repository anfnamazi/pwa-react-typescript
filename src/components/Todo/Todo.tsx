import { FunctionComponent } from "react";
import useTodo from "./hooks/useTodo";
import { StatusEnum } from "./types/todoTypes";

interface TodoProps {}

const Todo: FunctionComponent<TodoProps> = () => {
  const {
    status,
    visibleTasks,
    handleSubmit,
    handleRemove,
    handleChangeCheckbox,
    handleChangeSort,
    SortCondition,
    handleChangeStatus,
    updateDnDState,
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
          <li key={task.date} draggable onDragEnd={updateDnDState}>
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
          <button disabled={status === i} onClick={handleChangeStatus(i)}>
            {i}
          </button>
        ))}
      </div>
    </>
  );
};

export default Todo;
