import Header from './Header';
import Footer from './Footer';
import { useState } from 'react';
import { Form, Input, Button, Radio, message } from 'antd';

function ProfileEdit() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
  const [showProfile, setShowProfile] = useState(false);
  const [logout, setLogout] = useState(false);

  const [form] = Form.useForm();

  const initialValues = {
    username: currentUser.username,
    email: currentUser.email,
    password: currentUser.password,
    gender: currentUser.gender,
  };

  const handleProfile = () => {
    setShowProfile(prev => !prev);
    if (logout) {
      setLogout(false);
    }
  };

  const handleLogout = () => {
    setLogout(true);
  };

  const onFinish = (values) => {
    // values: formdaki güncel bilgiler
    const updatedUser = values;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map(user =>
      user.username === currentUser.username ? updatedUser : user
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    message.success("Bilgiler Güncellendi.");

    // Todo key güncellemesi
    const oldTodoKey = `todos_${currentUser.username}`;
    const newTodoKey = `todos_${updatedUser.username}`;

    if (oldTodoKey !== newTodoKey) {
      const oldTodos = JSON.parse(localStorage.getItem(oldTodoKey)) || [];
      localStorage.setItem(newTodoKey, JSON.stringify(oldTodos));
      localStorage.removeItem(oldTodoKey);
    }

    // Sayfayı yenile
    window.location.reload();
  };

  return (
    <>
     <div className='app-container'>
      <Header
        user={currentUser.username}
        showProfile={showProfile}
        logout={logout}
        handleProfile={handleProfile}
        handleLogout={handleLogout}
        setLogout={setLogout}
      />
         
            <main className="main-content">
        <div className="edit-container">
          <div className="edit-page">
            <Form
              form={form}
              name="profileEdit"
              onFinish={onFinish}
              layout="vertical"
              initialValues={initialValues}
              className="inputs"
            >
              <h1>Profil Bilgilerin</h1>

              <Form.Item
                label="Kullanıcı Adı"
                name="username"
                rules={[{ required: true, message: 'Lütfen kullanıcı adınızı girin!' }]}
              >
                <Input placeholder="Kullanıcı Adı Giriniz" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Lütfen email girin!' },
                  { type: 'email', message: 'Geçerli bir email girin!' }
                ]}
              >
                <Input placeholder="Email Giriniz" />
              </Form.Item>

              <Form.Item
                label="Şifre"
                name="password"
                rules={[{ required: true, message: 'Lütfen şifrenizi girin!' }]}
              >
                <Input.Password placeholder="Şifre Giriniz" />
              </Form.Item>

              <Form.Item
                label="Cinsiyet"
                name="gender"
                rules={[{ required: true, message: 'Lütfen cinsiyet seçin!' }]}
              >
                <Radio.Group>
                  <Radio value="Kadın">Kadın</Radio>
                  <Radio value="Erkek">Erkek</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item>
                <Button className="button" type="none" htmlType="submit">
                  Bilgileri Güncelle
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>

      </main>
   
      <Footer />
         </div>
    </>
  );
}

export default ProfileEdit;
