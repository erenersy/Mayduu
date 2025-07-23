import { useEffect, useState } from 'react';
import TodoList from './TodoList';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from "react-router-dom";

function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [logout, setLogout] = useState(false);
  const [edit, setEdit] = useState(false);        // Düzenleme ekranı açık mı?
  const [editText, setEditText] = useState('');   // Düzenleme kutusundaki metin
  const [editIndex, setEditIndex] = useState(null); // Hangi todo düzenleniyor
  const navigate = useNavigate();



  // Giriş yapan kullanıcıyı al
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  const todoKey = currentUser ? `todos_${currentUser.username}` : null;

  const user = currentUser ? currentUser.username : null;
  

// Corrected Code
useEffect(() => {
  if (!currentUser) {
    navigate("/login");
  }
}, [currentUser, navigate]);



  // LocalStorage'dan kullanıcının todosunu yükle
  useEffect(() => {
    if (!todoKey) {

      return; } // kullanıcı yoksa işlemi durdur
    const savedTodos = JSON.parse(localStorage.getItem(todoKey)) || [];
    setTodos(savedTodos);
    setIsLoaded(true);
  }, [todoKey, navigate]);
  

  // todos değiştikçe sadece ilgili kullanıcıya kaydet
  useEffect(() => {
    if (isLoaded && todoKey) {
      localStorage.setItem(todoKey, JSON.stringify(todos));
    }
  }, [todos, isLoaded, todoKey]);
  

  if (!currentUser) {
      return; // currentUser yoksa todoları yüklemeye çalışma.
    }

    

 const handleAdd = () => {
  if (newTodo.trim() === '') return;
  const newTask = {
    text: newTodo.trim(),
    done: false
  };
  setTodos([...todos, newTask]);
  setNewTodo('');
};

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

const handleEdit = (index) => {
  setEdit(true);                        // Düzenleme ekranını aç
  setEditText(todos[index].text);      // Düzenleme kutusuna seçilen todo’nun metnini koy
  setEditIndex(index);                 // Hangi todo düzenlenecek, onu kaydet
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
    <div className='app-container'>
      <Header 
        user={user}
        showProfile={showProfile}
        logout={logout}
        handleProfile={handleProfile}
        handleLogout={handleLogout}
        setLogout={setLogout}
      />
 <main className="main-content">
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
        </div>

{edit ? (
  <div className="edit-page">
    <h2>Görevi Düzenle</h2>
    <input
      type="text"
      value={editText}
      onChange={(e) => setEditText(e.target.value)}
      placeholder="Yeni metni girin"
    />
    <div className="edit-buttons">
      <button className='save-button'
        onClick={() => {
          const updatedTodos = [...todos];
          updatedTodos[editIndex].text = editText;
          setTodos(updatedTodos);
          setEdit(false);
          setEditIndex(null);
          setEditText('');
        }}
      >
        Kaydet
      </button>
      <button className='cancel-button'
        onClick={() => {
          setEdit(false);
          setEditIndex(null);
          setEditText('');
        }}
      >
        Vazgeç
      </button>
    </div>
  </div>
) : (
  <>
    {/* Burada mevcut todo list ekranın olur */}
    <div className="todo-add">
      {/* input ve ekle butonu */}
    </div>
    <TodoList
      todos={todos}
      onDelete={handleDelete}
      onToggle={handleToggle}
      onEdit={handleEdit}
    />
  </>
)}
      </div>
      
    </main>
  <Footer />
    </div>
    
  );
}

export default TodoPage;
