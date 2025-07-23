import { useState, useEffect } from 'react';
import Logo from '../images/mayduu-black.png';
import { useNavigate } from "react-router-dom";

function Header({ user, showProfile, logout, handleProfile, handleLogout, setLogout }) {

    const [usergender, setUserGender] = useState("👨🏻")
    

    const navigate = useNavigate();
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const gender = currentUser.gender;


    useEffect(() => {
    if (gender === "Kadın") {
      setUserGender("👩🏻");
    }
  }, [gender]);

  const handleProfileEdit = () => {
  navigate('/profileedit');
}


  return (
     <header className="header-app">
        <div className="logo">
          <a href="./todopage"><img src={Logo} alt="mayduu logo" /></a>
        </div>
        <div className="profile-settings">
          
          <div className="profile">
            {usergender}
            <b>{user}</b>
          </div>
          <div>
            <button
              className="settings"
              style={{ cursor: 'pointer' }}
              onClick={handleProfile}
            >
              ⚙️
            </button>
          </div>


{showProfile && (
  <div className="profile-dropdown">

    <button className='profile-edit' onClick={handleProfileEdit}>Profili Düzenle</button>
    
    <button
      onClick={handleLogout}

      className="logout-button"
    >
      Çıkış Yap
    </button>
  </div>
  
)}

{logout && (
  <div className="notice">
    <p className="logout-text">Çıkış yapmak istediğine emin misin?</p>
    <div className="logout-button" onClick={
    () => {
      localStorage.removeItem('currentUser');
      window.location.href = '/login';}}>Evet</div>
    <div className="logout-button" onClick={() => setLogout(false)}>Hayır</div>
  </div>
)}
        </div>
      </header>
      

      
  )
}

export default Header