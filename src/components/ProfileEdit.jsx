import Header from './Header'
import Footer from './Footer'
import { useState } from 'react';

function ProfileEdit() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
  const [showProfile, setShowProfile] = useState(false);
  const [logout, setLogout] = useState(false);
  
 
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: currentUser.password,
    gender: currentUser.gender,
    
  });

  const handleProfile = () => {
    setShowProfile(prev => !prev);
      if (setLogout){
    setLogout(false);
}
  };

  const handleLogout = () => {
    setLogout(true);
  };

    const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUser = formData
    

    const users = JSON.parse(localStorage.getItem("users")) || [];


      const updatedUsers = users.map(user =>
    user.username === currentUser.username ? updatedUser: user
  );

localStorage.setItem("users", JSON.stringify(updatedUsers))
localStorage.setItem("currentUser", JSON.stringify(updatedUser))
alert("Bilgiler Güncellendi.")

    const oldTodoKey = `todos_${currentUser.username}`;
    const newTodoKey = `todos_${updatedUser.username}`;

  if (oldTodoKey !== newTodoKey) {
    const oldTodos = JSON.parse(localStorage.getItem(oldTodoKey)) || [];
    // Eski todo listesini yeni key'e taşı
    localStorage.setItem(newTodoKey, JSON.stringify(oldTodos));
    // Eski todo key'ini sil
    localStorage.removeItem(oldTodoKey);
  }

  window.location.reload();

  }

  return (
    <>
      <Header
        user={currentUser.username}
        showProfile={showProfile}
        logout={logout}
        handleProfile={handleProfile}
        handleLogout={handleLogout}
        setLogout={setLogout}
      />
<div className="app-container">
      <div className="edit-container">
        <div className='edit-page'>
           <form onSubmit={handleSubmit} className="inputs">
            <h1>Profil Bilgilerin</h1>
         <label htmlFor="username">Kullanıcı Adı</label>
        <input
          id="username"
          name="username"
          type="text"
          value={formData.username} 
          onChange={handleChange}
          placeholder="Kullanıcı Adı Giriniz"
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Giriniz"
          required
        />

        <label htmlFor="password">Şifre</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Şifre Giriniz"
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

        <button className="button" type="submit">Bilgileri Güncelle</button>
        </form>

        </div>
        
      </div>
      </div>

      <Footer />
    </>
  );
}

export default ProfileEdit;
