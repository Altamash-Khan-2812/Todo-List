import { useState } from "react";

export const TodoForm = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState({});

  function handleFormSubmit(e) {
    e.preventDefault();
    onAddTodo(inputValue);
    setInputValue({ id: "", content: "", checked: false });
  }

  function handleInputChange(value) {
    setInputValue({ id: value, content: value, checked: false });
  }

  return (
    <section className="form">
      <form onSubmit={handleFormSubmit}>
        <div>
          <input
            type="text"
            className="todo-input"
            autoComplete="off"
            value={inputValue.content}
            onChange={(e) => handleInputChange(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" className="todo-btn">
            Add Task
          </button>
        </div>
      </form>
    </section>
  );
};
