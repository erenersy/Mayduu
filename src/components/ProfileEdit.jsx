
import { Form, Input, Button, Radio} from 'antd';
import { useContext } from 'react';
import translations from './Translations';
import { LanguageContext } from '../contexts/LanguageContext';

function ProfileEdit() {

    const { language } = useContext(LanguageContext);
    const t = translations[language].profileEditPage;

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
    alert(t.usernameTaken);
    return;
  }

  if (isEmailTakenByAnother) {
    alert(t.emailTaken);
    return;
  }

    const updatedUsers = users.map(user =>
      user.username === currentUser.username ? updatedUser : user
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    alert(t.updated);

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
              <h1>{t.header}</h1>

              <Form.Item
                label={t.username}
                name="username"
                rules={[{ required: true, message: t.usernameRequired }]}
              >
                <Input placeholder={t.username} />
              </Form.Item>

              <Form.Item
                label={t.email}
                name="email"
                rules={[
              { required: true, message: t.emailRequired },
              { type: 'email', message: t.emailInvalid }
                ]}
              >
                <Input placeholder={t.email} />
              </Form.Item>

              <Form.Item
                label={t.password}
                name="password"
                rules={[{ required: true, message: t.passwordRequired }]}
              >
                <Input.Password placeholder={t.password} />
              </Form.Item>

              <Form.Item
                label={t.gender}
                name="gender"
                rules={[{ required: true, message: t.genderRequired }]}
              >
                <Radio.Group>
              <Radio value="Kadın">{t.genderOptions.female}</Radio>
              <Radio value="Erkek">{t.genderOptions.male}</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item>
                <Button className="button" type="none" htmlType="submit">
                  {t.submitButton}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>


   


    </>
  );
}

export default ProfileEdit;
