import Header from './Header';
import Footer from './Footer';
import { Form, Input, Button, Radio} from 'antd';

function ProfileEdit() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};

  const [form] = Form.useForm();

  const initialValues = {
    username: currentUser.username,
    email: currentUser.email,
    password: currentUser.password,
    gender: currentUser.gender,
  };



  const onFinish = (values) => {

    // Values: formdaki güncel bilgiler
    const updatedUser = values;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    
  const isUsernameTakenByAnother = users.some(user =>
    user.username === updatedUser.username &&
    user.username !== currentUser.username
  );

  const isEmailTakenByAnother = users.some(user =>
    user.email === updatedUser.email &&
    user.email !== currentUser.email
  );

  if (isUsernameTakenByAnother) {
    alert("Bu kullanıcı adı zaten kullanımda.");
    return;
  }

  if (isEmailTakenByAnother) {
    alert("Bu e-posta adresi zaten kullanımda.");
    return;
  }

    const updatedUsers = users.map(user =>
      user.username === currentUser.username ? updatedUser : user
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    alert("Bilgiler Güncellendi.");

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


   


    </>
  );
}

export default ProfileEdit;
