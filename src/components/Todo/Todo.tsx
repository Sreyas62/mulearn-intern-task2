import React, { useState, useEffect } from 'react';
import './Todo.css'; // Import CSS file for Todo component styling
import axios from 'axios';

interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
}

interface TodoProps {
  handleLogout: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Todo: React.FC<TodoProps> = ({ handleLogout }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzODk4ODE0LCJpYXQiOjE2ODM4OTg1MTQsImp0aSI6IjczMzExYzAwMDRhMDQzNGNiYjg3MTQzODBmYTY2ZjcyIiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJqZW5pbiJ9.EZiMlJgo1AeHT-7Qg6QTQw1oeenFD8ycecs-YmaoFFI'; // Replace with your actual access token

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('https://mulearn-internship-task-production.up.railway.app/api/todo/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    if (newTodo.trim() === '') return;
    try {
      const response = await axios.post(
        'https://mulearn-internship-task-production.up.railway.app/api/todo/',
        {
          title: newTodo,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`https://mulearn-internship-task-production.up.railway.app/api/todo/${id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const toggleTodoStatus = async (id: number) => {
    try {
      const todo = todos.find((todo) => todo.id === id);
      if (todo) {
        const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
        await axios.put(
          `https://mulearn-internship-task-production.up.railway.app/api/todo/${id}/`,
          updatedTodo,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const updatedTodos = todos.map((todo) =>
          todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        );
        setTodos(updatedTodos);
      }
    } catch (error) {
      console.error('Error updating todo status:', error);
    }
  };

  const updateTodo = async () => {
    if (newTodo.trim() === '') return;
    try {
      const updatedTodo = { ...selectedTodo!, title: newTodo };
      await axios.put(
        `https://mulearn-internship-task-production.up.railway.app/api/todo/${selectedTodo!.id}/`,
        updatedTodo,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const updatedTodos = todos.map((todo) =>
        todo.id === selectedTodo!.id ? updatedTodo : todo
      );
      setTodos(updatedTodos);
      setNewTodo('');
      setSelectedTodo(null);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleEditTodo = (todo: Todo) => {
    setNewTodo(todo.title);
    setSelectedTodo(todo);
  };

  return (
    <div className="todo-container">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <h1>Todo App</h1>
      <div className="todo-input">
        <input
          type="text"
          placeholder="Enter a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        {selectedTodo ? (
          <button className="todo-button" onClick={updateTodo}>
            Update
          </button>
        ) : (
          <button className="todo-button" onClick={addTodo}>
            Add
          </button>
        )}
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.isCompleted ? 'completed' : ''}`}>
            <span>{todo.title}</span>
            <div>
              <button className="edit-button" onClick={() => handleEditTodo(todo)}>
                Edit
              </button>
              <button className="delete-button" onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
              <button className="status-button" onClick={() => toggleTodoStatus(todo.id)}>
                {todo.isCompleted ? 'Incomplete' : 'Complete'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
