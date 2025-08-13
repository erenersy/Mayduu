import { useEffect, useState, useContext } from 'react';
import TodoList from './TodoList';

import { useNavigate } from "react-router-dom";
import { Button, Input} from 'antd';
import { LanguageContext } from '../contexts/LanguageContext';
import translations from './Translations';


function TodoPage() {

  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const [edit, setEdit] = useState(false);        // Düzenleme ekranı açık mı?
  const [editText, setEditText] = useState('');   // Düzenleme kutusundaki metin
  const [editIndex, setEditIndex] = useState(null); // Hangi todo düzenleniyor
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const todoKey = currentUser ? `todos_${currentUser.username}` : null;

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (!todoKey) {
      return;
    }
    const savedTodos = JSON.parse(localStorage.getItem(todoKey)) || [];
    setTodos(savedTodos);
    setIsLoaded(true);
  }, [todoKey]);

  useEffect(() => {
    if (isLoaded && todoKey) {
      localStorage.setItem(todoKey, JSON.stringify(todos));
    }
  }, [todos, isLoaded, todoKey]);

  if (!currentUser) {
    return null; // currentUser yoksa render etme
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
    setEdit(true);
    setEditText(todos[index].text);
    setEditIndex(index);
  };

  return (
    


      <main className="todo-wrapper">
        <div className="todo-container">
          <h1 className="todo-header">{t.header}</h1>
          <div className="todos-container">

            {/* Yeni Görev Ekleme Alanı */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              <Input
                placeholder={t.addPlaceholder}
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onPressEnter={handleAdd}
                allowClear
              />
              <Button className="button" type='none' onClick={handleAdd}>
                {t.addButton}
              </Button>
            </div>

            {edit ? (
              <div className="edit-page" style={{ marginBottom: '20px' }}>
                <h2>{t.editHeader}</h2>
                <Input
                  placeholder={t.editPlaceholder}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onPressEnter={() => {
                    const updatedTodos = [...todos];
                    updatedTodos[editIndex].text = editText;
                    setTodos(updatedTodos);
                    setEdit(false);
                    setEditIndex(null);
                    setEditText('');
                  }}
                  allowClear
                />
                <div className="edit-buttons" style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                  <Button
                    type="primary"
                    onClick={() => {
                      const updatedTodos = [...todos];
                      updatedTodos[editIndex].text = editText;
                      setTodos(updatedTodos);
                      setEdit(false);
                      setEditIndex(null);
                      setEditText('');
                    }}
                  >
                    {t.save}
                  </Button>
                  <Button
                    danger
                    onClick={() => {
                      setEdit(false);
                      console.log(edit)
                      setEditIndex(null);
                      setEditText('');
                    }}
                  >
                    {t.cancel}
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Todo Listesi */}
                <TodoList
                  todos={todos}
                  onDelete={handleDelete}
                  onToggle={handleToggle}
                  onEdit={handleEdit}
                />
              </>
            )}
          </div>
        </div>
      </main>


  );
}

export default TodoPage;
