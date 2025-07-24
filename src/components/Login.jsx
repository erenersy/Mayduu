import '../App.css';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Typography, message } from 'antd';
import Logo from '../images/mayduu-black.png';

const { Title, Text } = Typography;

function Login() {
  const navigate = useNavigate();

  // Form gönderildiğinde çalışacak fonksiyon
  const onFinish = (values) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const foundUser = users.find(
      (u) => u.username === values.username && u.password === values.password
    );

    if (foundUser) {
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      navigate('/todopage');
    } else {
      message.error('Kullanıcı adı veya şifre yanlış!');
    }
  };

  return (
    <div className="login-container">
      <img src={Logo} alt="mayduu logo" style={{ display: 'block' }} />
      <Title level={2} className="header" style={{ marginBottom: "25px" }}>
        Mayduu'ya Hoşgeldin
      </Title>

      <Form
        name="login"
        onFinish={onFinish}
        layout="vertical"
        className="custom-form"
        initialValues={{ username: '', password: '' }}

      >
        <Form.Item
          label="Kullanıcı Adı"
          name="username"
          rules={[{ required: true, message: 'Lütfen kullanıcı adınızı girin!' }]}
        >
          <Input placeholder="Kullanıcı adınızı girin" />
        </Form.Item>

        <Form.Item
          label="Şifre"
          name="password"
          rules={[{ required: true, message: 'Lütfen şifrenizi girin!' }]}
          style={{marginBottom: "20px"}}
        >
          <Input.Password placeholder="Şifrenizi girin" />
        </Form.Item>

        <Form.Item>
          <Button className="button" type="none" htmlType="submit" block>
            Giriş Yap
          </Button>
        </Form.Item>
      </Form>

      <Text className="info" style={{ display: 'block', textAlign: 'center' }}>
        Kayıtlı değil misin? <Link to="/register">Kaydol</Link>
      </Text>
    </div>
  );
}

export default Login;
