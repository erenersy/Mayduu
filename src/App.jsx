import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import TodoPage from './components/TodoPage';
import ProfileEdit from './components/ProfileEdit';
import UsersPage from './components/UsersPage';
import Contact from './components/Contact';

import 'antd/dist/reset.css';

import { ConfigProvider, App as AntdApp } from 'antd';

function App() {

  return (
     <ConfigProvider>
      <AntdApp>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todopage" element={<TodoPage />} />
        <Route path="/profileedit" element={<ProfileEdit />} />
        <Route path="/userspage" element={<UsersPage />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
     </AntdApp>
    </ConfigProvider>
  );
}

export default App;
