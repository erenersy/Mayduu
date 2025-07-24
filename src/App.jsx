import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import TodoPage from './components/TodoPage';
import ProfileEdit from './components/ProfileEdit';
import 'antd/dist/reset.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todopage" element={<TodoPage />} />
        <Route path="/profileedit" element={<ProfileEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
