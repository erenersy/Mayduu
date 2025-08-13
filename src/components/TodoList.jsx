
import { Button, Popconfirm, List, Typography } from 'antd';
import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import translations from './Translations';

const { Text } = Typography;

function TodoList({ todos, onDelete, onToggle, onEdit }) {

    const { language } = useContext(LanguageContext);
    const t = translations[language];



  return (
    <div className="todo-list-container">
      <List
        locale={{ emptyText: 'Burada todolarınız görünür' }}
        dataSource={todos}
        renderItem={(todo, index) => (
          <List.Item
            actions={[
              <Button type={todo.done ? "default" : "primary"} onClick={() => onToggle(index)}>
                {todo.done ? t.undo : t.complete}
              </Button>,
              <Button onClick={() => onEdit(index)}>{t.edit}</Button>,
              <Popconfirm
                title="Silmek istediğinize emin misiniz?"
                onConfirm={() => onDelete(index)}
                okText={t.yes}
                cancelText={t.no}
                okButtonProps={{ className: "button", type: "none"}}
  cancelButtonProps={{ className: "button", type: "none" }}

              >
                <Button danger>{t.delete}</Button>
              </Popconfirm>,
            ]}
          >
            <Text delete={todo.done} ellipsis={{ tooltip: todo.text }}>
              {todo.text.length > 40 ? todo.text.slice(0, 40) + '...' : todo.text}
            </Text>
          </List.Item>
        )}
      />
    </div>
  );
}

export default TodoList;
