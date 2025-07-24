
import { Button, Popconfirm, List, Typography } from 'antd';

const { Text } = Typography;

function TodoList({ todos, onDelete, onToggle, onEdit }) {


  return (
    <div className="todo-list-container">
      <List
        locale={{ emptyText: 'Burada todolarınız görünür' }}
        dataSource={todos}
        renderItem={(todo, index) => (
          <List.Item
            actions={[
              <Button type={todo.done ? "default" : "primary"} onClick={() => onToggle(index)}>
                {todo.done ? 'Geri Al' : 'Tamamla'}
              </Button>,
              <Button onClick={() => onEdit(index)}>Düzenle</Button>,
              <Popconfirm
                title="Silmek istediğinize emin misiniz?"
                onConfirm={() => onDelete(index)}
                okText="Evet"
                cancelText="Hayır"
                okButtonProps={{ className: "button", type: "none"}}
  cancelButtonProps={{ className: "button", type: "none" }}

              >
                <Button danger>Sil</Button>
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
