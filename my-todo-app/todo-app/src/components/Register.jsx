import '../App.css'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/mayduu-black.png';


function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    gender: '',
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


    const isUserExists = users.some((user) => user.username === formData.username);

  if (isUserExists) {
    alert('Bu kullanıcı adı zaten alınmış!');
    return;    
  }

  
   const isMailExists = users.some((user) => user.email === formData.email);

  if (isMailExists) {
    alert('Bu e-mail zaten kullanımda!');
    return;
  }

    users.push(formData);
    
    localStorage.setItem('users', JSON.stringify(users));
    alert('Bilgiler kaydedildi!');
  };

  return (
    <div className="container">
      <img src={Logo} alt="mayduu logo" />
      <h1 className="header">Mayduu'ya Hoşgeldin</h1>
      <h2 className="header2">Hemen Kaydol</h2>
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

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
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

        <label>Cinsiyet</label>
        <div>
          <input
            type="radio"
            id="kadin"
            name="gender"
            value="Kadın"
            checked={formData.gender === 'Kadın'}
            onChange={handleChange}
            required
          />
          <label htmlFor="kadin">Kadın</label>
        </div>
        <div>
          <input
            type="radio"
            id="erkek"
            name="gender"
            value="Erkek"
            checked={formData.gender === 'Erkek'}
            onChange={handleChange}
            required
          />
          <label htmlFor="erkek">Erkek</label>
        </div>

        <button className="button" type="submit">Kaydol</button>
        <p className="info">Kayıtlı mısın? <Link to="/login">Giriş yap</Link></p>
      </form>
    </div>
  );
}

export default Register;