import React, { useEffect, useState } from 'react';
import TodoList from './TodoList';
import Logo from '../images/mayduu-black.png';
import Register from './Register';

function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [logout, setLogout] = useState(false);




  // Giriş yapan kullanıcıyı al
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const todoKey = currentUser ? `todos_${currentUser.username}` : null;

  const user = currentUser.username;

  // LocalStorage'dan kullanıcının todosunu yükle
  useEffect(() => {
    if (!todoKey) return; // kullanıcı yoksa işlemi durdur
    const savedTodos = JSON.parse(localStorage.getItem(todoKey)) || [];
    setTodos(savedTodos);
    setIsLoaded(true);
  }, [todoKey]);

  // todos değiştikçe sadece ilgili kullanıcıya kaydet
  useEffect(() => {
    if (isLoaded && todoKey) {
      localStorage.setItem(todoKey, JSON.stringify(todos));
    }
  }, [todos, isLoaded, todoKey]);

 const handleAdd = () => {
  if (newTodo.trim() === '') return;
  const newTask = {
    text: newTodo.trim(),
    done: false
  };
  setTodos([...todos, newTask]);
  setNewTodo('');
};

  if (!currentUser) {
    return <p>Lütfen giriş yapınız.</p>;
  }

  const handleDelete = (index) => {
  const updatedTodos = todos.filter((_, i) => i !== index);
  setTodos(updatedTodos);
};

const handleToggle = (index) => {
  const updatedTodos = todos.map((todo, i) =>
    i === index ? { ...todo, done: !todo.done } : todo
  );
  setTodos(updatedTodos);
};

const handleProfile = () => {
  setShowProfile(prev => !prev);
  if (setLogout){
    setLogout(false);
  }
}

const handleLogout = () => {
  setLogout(prev => !prev);
}



return (
    <>
      <div className="header-app">
        <div className="logo">
          <img src={Logo} alt="mayduu logo" />
        </div>
        <div className="profile-settings">
          <div>
            <button
              className="profile"
              style={{ cursor: 'pointer' }}
              onClick={handleProfile}
            >
              ⚙️
            </button>
          </div>


{showProfile && (
  <div className="profile-dropdown">
    <p className='settings-user'>👤 {user}</p>
    <button
      onClick={handleLogout}

      className="logout-button"
    >
      Çıkış Yap
    </button>
  </div>
  
)}

{logout && (
  <div className="notice">
    <p className="logout-text">Çıkış yapmak istediğine emin misin?</p>
    <div className="logout-button" onClick={
    () => {
      localStorage.removeItem('currentUser');
      window.location.href = '/login';}}>Evet</div>
    <div className="logout-button" onClick={() => setLogout(false)}>Hayır</div>
  </div>
)}
        </div>
      </div>

      <div className="todo-container">
        <h1 className="todo-header">Todo List</h1>
        <div className="todos-container">
          <div className="todo-add">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Yeni görev ekle"
            />
            <button className="add-button" onClick={handleAdd}>
              +
            </button>
          </div>
          <div className="todo-list">
            <TodoList
              todos={todos}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoPage;
