import {
  ChangeEventHandler,
  DragEventHandler,
  SyntheticEvent,
  useState,
} from "react";
import { useDidMount, useDidUpdate } from "rooks";
import { ITask, SortEnum, StatusEnum } from "../types/todoTypes";

interface IUseTodo {
  (): {
    tasks: ITask[];
    visibleTasks: ITask[];
    sort: SortEnum;
    status: StatusEnum;
    handleSubmit: (e: SyntheticEvent) => void;
    handleRemove: (date: number) => () => void;
    handleChangeCheckbox: (
      date: number
    ) => ChangeEventHandler<HTMLInputElement>;
    handleChangeSort: () => void;
    SortCondition: () => string;
    handleSort: () => void;
    handleChangeStatus: (status: StatusEnum) => () => void;
    handleDrop: (targetTask: ITask) => DragEventHandler<HTMLLIElement>;
    handleDragStart: (draggingTask: ITask) => DragEventHandler<HTMLLIElement>;
    handleDragOver: DragEventHandler<HTMLLIElement>;
  };
}

const useTodo: IUseTodo = () => {
  /* #region States */
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [visibleTasks, setVisibleTasks] = useState<ITask[]>([]);
  const [sort, setSort] = useState<SortEnum>(SortEnum.NONE);
  const [status, setStatus] = useState<StatusEnum>(StatusEnum.ALL);
  const [draggingTask, setDraggingTask] = useState<ITask>();
  /* #endregion */

  /* #region Funcs */
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      todo: { value: string };
    };
    const title = target.todo.value.trim();
    const date = Date.now();
    const task = { title, completed: false, date };
    setTasks((prev) => [...prev, task]);
    target.todo.value = "";
  };

  const handleRemove = (date: number) => {
    // use closure to enhance performance by avoiding from inline callback
    // can use different key like id or something else but i prefer to use date
    return () => {
      setTasks((prev) => prev.filter((t) => t.date !== date));
    };
  };

  const handleChangeCheckbox = (
    date: number
  ): ChangeEventHandler<HTMLInputElement> => {
    return (e) => {
      setTasks((prev) => {
        const targetTask = prev.find((i) => i.date === date);
        targetTask.completed = e.target.checked;
        return [...prev];
      });
    };
  };

  /* #region Sort */
  const handleChangeSort = () => {
    setSort((prev) => {
      switch (prev) {
        case SortEnum.NONE:
          return SortEnum.ASC;
        case SortEnum.ASC:
          return SortEnum.DESC;
        case SortEnum.DESC:
          return SortEnum.NONE;
      }
    });
  };

  const SortCondition = () => {
    switch (sort) {
      case SortEnum.NONE:
        return "";
      case SortEnum.ASC:
        return "&#8593;";
      case SortEnum.DESC:
        return "&#8595;";
    }
  };

  const handleSort = () => {
    switch (sort) {
      case SortEnum.NONE:
        setVisibleTasks([...tasks]);
        break;
      case SortEnum.ASC:
        setVisibleTasks(() => {
          tasks.sort((a, b) => a.date - b.date);
          return [...tasks];
        });
        break;
      case SortEnum.DESC:
        setVisibleTasks(() => {
          tasks.sort((a, b) => b.date - a.date);
          return [...tasks];
        });
        break;
    }
  };
  /* #endregion */

  /* #region Status */
  const handleChangeStatus = (status: StatusEnum) => {
    return () => {
      setStatus(status);
    };
  };
  /* #endregion */

  /* #region Drag */
  const handleDragStart = (
    draggingTask: ITask
  ): DragEventHandler<HTMLLIElement> => {
    return (e) => {
      setDraggingTask(draggingTask);
      e.dataTransfer.setData("text/plain", "");
    };
  };

  const handleDrop = (targetTask: ITask): DragEventHandler<HTMLLIElement> => {
    return (e) => {
      if (!draggingTask) return;
      // find index of dragging task & target task
      const currentIndex = tasks.indexOf(draggingTask);
      const targetIndex = tasks.indexOf(targetTask);
      // swap dragging task with target task
      if (currentIndex !== -1 && targetIndex !== -1) {
        tasks.splice(currentIndex, 1);
        tasks.splice(targetIndex, 0, draggingTask);
        setTasks([...tasks]);
      }
    };
  };

  const handleDragOver: DragEventHandler<HTMLLIElement> = (e) => {
    e.preventDefault();
  };
  /* #endregion */
  /* #endregion */

  useDidUpdate(() => {
    handleSort();
  }, [sort, tasks]);

  useDidUpdate(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useDidMount(() => {
    const tasksStr = localStorage.getItem("tasks");
    if (tasksStr) {
      const tasks = JSON.parse(tasksStr);
      setTasks(tasks);
    }
  });
  /* #endregion */

  return {
    tasks,
    visibleTasks,
    sort,
    status,
    handleSubmit,
    handleRemove,
    handleChangeCheckbox,
    handleChangeSort,
    SortCondition,
    handleSort,
    handleChangeStatus,
    handleDragStart,
    handleDrop,
    handleDragOver,
  };
};

export default useTodo;
