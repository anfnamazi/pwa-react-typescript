import { FunctionComponent } from "react";
import useTodo from "./hooks/useTodo";
import { SortEnum, StatusEnum } from "./types/todoTypes";

interface TodoProps {}

const Todo: FunctionComponent<TodoProps> = () => {
  const {
    status,
    visibleTasks,
    sort,
    handleSubmit,
    handleRemove,
    handleChangeCheckbox,
    handleChangeSort,
    SortCondition,
    handleChangeStatus,
    handleDrop,
    handleDragOver,
    handleDragStart,
  } = useTodo();
  return (
    <>
      <div style={{ display: "flex", gap: 8 }}>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="todo" name="todo" />
          <button type="submit">&#10147;</button>
        </form>
        <button onClick={handleChangeSort}>
          sort by date{" "}
          <span dangerouslySetInnerHTML={{ __html: SortCondition() }} />
        </button>
      </div>
      <ul>
        {visibleTasks.map((task) =>
          status === StatusEnum.ALL ||
          (status === StatusEnum.ACTIVE && !task.completed) ||
          (status === StatusEnum.COMPLETED && task.completed) ? (
            <li
              key={task.date}
              draggable={sort === SortEnum.NONE}
              onDragStart={handleDragStart(task)}
              onDragOver={handleDragOver}
              onDrop={handleDrop(task)}
            >
              {sort === SortEnum.NONE ? (
                <span dangerouslySetInnerHTML={{ __html: "&#9871;" }} />
              ) : null}
              <input
                type="checkbox"
                checked={task.completed}
                onChange={handleChangeCheckbox(task.date)}
              />
              {task.title}
              <button onClick={handleRemove(task.date)}>&#10006;</button>
            </li>
          ) : null
        )}
      </ul>
      <div>
        {Object.values(StatusEnum).map((i) => (
          <button
            disabled={status === i}
            key={i}
            onClick={handleChangeStatus(i)}
          >
            {i}
          </button>
        ))}
      </div>
    </>
  );
};

export default Todo;
