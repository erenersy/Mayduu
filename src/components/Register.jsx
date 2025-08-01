import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Radio, Typography } from 'antd';
import Logo from '../images/mayduu-black.png';
import '../App.css';

const { Title, Text } = Typography;

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const isUserExists = users.some((user) => user.username === values.username);
    if (isUserExists) {
      alert('Bu kullanıcı adı zaten alınmış!');

      setLoading(false);
      return;
    }

    const isMailExists = users.some((user) => user.email === values.email);
    if (isMailExists) {
      alert('Bu e-mail zaten kullanımda!');
      setLoading(false);
      return;
    }

    users.push(values);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Bilgiler kaydedildi!');
    setLoading(false);
    navigate('/login');
  };

  return (
    
    <div className="register-wrapper">
    <div className="register-container">
      <img src={Logo} alt="mayduu logo" />
      <Title level={2} className="header" style={{marginBottom: "25px" }}>Mayduu'ya Hoş Geldin</Title>

      <Form
        name="register"
        onFinish={onFinish}
        layout="vertical"
        className="custom-form"

        
      
      >
        <Form.Item
          label="Kullanıcı Adı"
          name="username"
          rules={[{ required: true, message: 'Lütfen kullanıcı adınızı girin!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Lütfen e-mail adresinizi girin!' },
            { type: 'email', message: 'Geçerli bir e-mail girin!' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Şifre"
          name="password"
          rules={[{ required: true, message: 'Lütfen şifrenizi girin!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Cinsiyet"
          name="gender"
          rules={[{ required: true, message: 'Lütfen cinsiyetinizi seçin!' }]}
        >
          <Radio.Group>
            <Radio value="Kadın">Kadın</Radio>
            <Radio value="Erkek">Erkek</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button className="button" type="none" htmlType="submit" block loading={loading} >
            Kaydol
          </Button>
        </Form.Item>

        <Text className="info" style={{ display: 'block', textAlign: 'center' }}>
          Kayıtlı mısın? <Link to="/login">Giriş yap</Link>
        </Text>
      </Form>
    </div>
    </div>
  );
}

export default Register;
