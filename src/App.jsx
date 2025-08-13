import { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import TodoPage from './components/TodoPage';
import ProfileEdit from './components/ProfileEdit';
import UsersPage from './components/UsersPage';
import Contact from './components/Contact';
import Header from './components/Header';
import Footer from './components/Footer';

import 'antd/dist/reset.css';

import { ConfigProvider, App as AntdApp } from 'antd';
import { ThemeProvider, ThemeContext } from './contexts/ThemeContext';
import { LanguageProvider, LanguageContext } from "./contexts/LanguageContext";

const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const user = currentUser ? currentUser.username : null;

function AppContent() {
  const location = useLocation();

  const hideHeaderFooterOn = ['/', '/login', '/register'];
  const shouldHideHeaderFooter = hideHeaderFooterOn.includes(location.pathname);

  const centerContentOn = ['/', '/register', '/login', '/profileedit', '/userspage', '/contact'];
  const shouldCenterContent = centerContentOn.includes(location.pathname);

  return (
    <div className="app-container">
      {!shouldHideHeaderFooter && <Header user={user} />}

      {shouldCenterContent ? (
        <div className="content-wrap">
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profileedit" element={<ProfileEdit />} />
            <Route path="/userspage" element={<UsersPage />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/todopage" element={<TodoPage />} />
        </Routes>
      )}

      {!shouldHideHeaderFooter && <Footer />}
    </div>
  );
}

function InnerApp() {
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [theme]);

  return (
    <ConfigProvider>
      <AntdApp>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AntdApp>
    </ConfigProvider>
  );
}
function App() {
  return (
    <ThemeProvider>
       <LanguageProvider>
      <InnerApp />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
