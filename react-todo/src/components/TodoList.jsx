import { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Write Tests", completed: false },
    { id: 3, text: "Build Todo App", completed: false }
  ]);

  const addTodo = (text) => {
    setTodos([
      ...todos,
      { id: Date.now(), text, completed: false }
    ]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    // 🔥 THIS WAS MISSING
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <input placeholder="Add todo" />
      <button
        onClick={() => {
          const input = document.querySelector("input");
          if (input.value.trim()) {
            addTodo(input.value);
            input.value = "";
          }
        }}
      >
        Add
      </button>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            style={{
              textDecoration: todo.completed
                ? "line-through"
                : "none",
              cursor: "pointer"
            }}
          >
            {todo.text}
            <button
              onClick={(e) => {
                e.stopPropagation(); // IMPORTANT
                deleteTodo(todo.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
