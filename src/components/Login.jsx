import '../App.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Logo from '../images/mayduu-black.png';



function Login() {

    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];

  const foundUser = users.find(
    (u) =>
      u.username === formData.username &&
      u.password === formData.password
  );

  if (foundUser) {

    localStorage.setItem('currentUser', JSON.stringify(foundUser));
    navigate('/todopage');

   
  } else {
    alert('Kullanıcı adı veya şifre yanlış!');
  }
  
    
  };

  return (
    <div className="container">
            <img src={Logo} alt="mayduu logo" />
      <h1 className="header">Mayduu'ya Hoşgeldin</h1>
      <form onSubmit={handleSubmit} className="inputs">
        <label htmlFor="username">Kullanıcı Adı</label>
        <input
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Şifre</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button className="button" type="submit">Giriş Yap</button>
<p className="info">Kayıtlı değil misin? <Link to="/register">Kaydol</Link></p>
      </form>
    </div>
  );
}

export default Login;