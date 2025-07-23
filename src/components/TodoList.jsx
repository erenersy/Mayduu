import { useState } from 'react';

function TodoList({ todos, onDelete, onToggle, onEdit }) {
  const [deleteTodo, setDeleteTodo] = useState(null);

  const isHandleDelete = (index) => {
    if (deleteTodo === index) {
      setDeleteTodo(null);
    } else {
      setDeleteTodo(index);
    }
  };

  return (
    <div className="todo-list-container">
      <ul>
        {todos.length === 0 && <li>Burada todolarınız görünür</li>}

        {todos.map((todo, index) => (
          <li key={index}>
            <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
              {todo.text.length > 40 ? todo.text.slice(0, 40) + '...' : todo.text}
            </span>
            <div className="todo-buttons">
              <button className="check" onClick={() => onToggle(index)}>✔</button>
              <button className="edit" onClick={() => onEdit(index)}>✎</button>
              <button className="delete" onClick={() => isHandleDelete(index)}>🗑</button>
               

              {deleteTodo === index && (
                <>
                 <div className="delete-confirm-box">
                  <p>Silmek istediğinize emin misiniz?</p>
                  <button className="check-delete-approve" onClick={() => { onDelete(index); setDeleteTodo(null); }}>Evet</button>
                  <button className="check-delete-approve" onClick={() => setDeleteTodo(null)}>Hayır</button>
                  </div>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
