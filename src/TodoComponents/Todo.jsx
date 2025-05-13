import { useState } from "react";
import "./Todo.css";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { TodoDate } from "./TodoDate";

const todoKey = "reactTodo";

const getLocalStorageTodoData = () => {
  const rawTodos = localStorage.getItem(todoKey);
  if (!rawTodos) return [];

  return JSON.parse(rawTodos);
};
export const Todo = () => {
  const [task, setTask] = useState(() => getLocalStorageTodoData());

  function handleFormSubmit(inputValue) {
    const { id, content, checked } = inputValue;
    if (!content.trim()) return;

    const ifTodoContentMatched = task.find(
      (currTask) => currTask.content === content
    );

    if (ifTodoContentMatched) return;

    setTask((prevTask) => [...prevTask, { id, content, checked }]);
  }

  localStorage.setItem("reactTodo", JSON.stringify(task));

  function handleDeleteButtonClick(currTask) {
    // let deleteIndex = task.indexOf(currTask);
    // let taskArrCopy = [...task];
    // taskArrCopy.splice(deleteIndex, 1);
    // setTask(taskArrCopy);

    setTask((prevTask) => prevTask.filter((task) => task.content !== currTask));
  }

  function handleAllTodoClear() {
    setTask([]);
  }

  function handleCheckedTodo(content) {
    const updatedTask = task.map((currTask) => {
      if (currTask.content === content) {
        return { ...currTask, checked: !currTask.checked };
      } else {
        return currTask;
      }
    });

    setTask(updatedTask);
  }

  return (
    <section className="todo-container">
      <header>
        <h1>Todo List</h1>
        <TodoDate />
      </header>

      <TodoForm onAddTodo={handleFormSubmit} />

      <section className="myUnOrdList">
        <ul>
          {task.map((currTask) => {
            return (
              <TodoList
                key={currTask.id}
                data={currTask.content}
                checked={currTask.checked}
                onHandleDeleteTodo={handleDeleteButtonClick}
                onHandleCheckedTodo={handleCheckedTodo}
              />
            );
          })}
        </ul>
      </section>

      <section>
        <button className="clear-btn" onClick={handleAllTodoClear}>
          Clear all
        </button>
      </section>
    </section>
  );
};
