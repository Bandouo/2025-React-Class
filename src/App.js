import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!task.trim()) return;
    setTodos([...todos, { text: task, checked: false }]);
    setTask('');
  };

  const toggleCheck = (index) => {
    const newTodos = [...todos];
    newTodos[index].checked = !newTodos[index].checked;
    setTodos(newTodos);
  };

  return (
    <div className="app-container">
      <h1 className="title">ToDo list</h1>
      <div className="input-area">
        <input
          type="text"
          value={task}
          placeholder="ADD TASK"
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTodo}>ADD</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className={todo.checked ? 'checked' : ''}>
            <label>
              <input
                type="checkbox"
                checked={todo.checked}
                onChange={() => toggleCheck(index)}
              />
              {todo.text}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
