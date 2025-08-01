import { useState, useEffect } from 'react';
import { Avatar, Dropdown, Menu, Button, Popconfirm,Drawer } from 'antd';
import {SettingOutlined, MenuOutlined } from '@ant-design/icons';
import Logo from '../images/mayduu-black.png';
import { Link, useNavigate, useLocation } from "react-router-dom";



function Header({ user }) {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
const [drawerVisible, setDrawerVisible] = useState(false);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);


  const [usergender, setUserGender] = useState("👨🏻");
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const gender = currentUser?.gender;

  useEffect(() => {
    if (gender === "Kadın") {
      setUserGender("👩🏻");
    }
  }, [gender]);

  const handleProfileEdit = () => {
    navigate('/profileedit');
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
    alert('Çıkış yapıldı.');
  };

  const menu = (
    <Menu style={{marginTop: "30px"}}>
              <Avatar style={{ backgroundColor: '#ffffffff' }} size="large">
          {usergender}
        </Avatar>
        <b>hoşgeldin {user}</b>
      <Menu.Item key="edit" onClick={handleProfileEdit} >

        <Button className='button' type='none'>Profili Düzenle</Button>
      </Menu.Item>
      <Menu.Item key="logout">
        <Popconfirm 

          placement="bottom"
          title="Çıkış yapmak istediğine emin misin?"
          
          onConfirm={handleLogoutConfirm}
          okText = "Evet"
          cancelText="Hayır"
            okButtonProps={{ className: "button", type: "none"}}
  cancelButtonProps={{ className: "button", type: "none" }}
          
        >
          <Button className='button' type='none' style={{ display: 'flex', textAlign: 'center' }}>
  Çıkış Yap
</Button>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  const selectedKey = (() => {
  if (location.pathname === '/todopage') return 'homepage';
  if (location.pathname === '/userspage') return 'userspage';
  return '';
})();

  return (
    <header className="header-app">
      <div className="logo">
<Link to="/todopage">
  <img src={Logo} alt="mayduu logo" />
</Link>
        
      </div>

{isMobile ? (
  <>
    <Button
      icon={<MenuOutlined />}
      
      onClick={() => setDrawerVisible(true)}
    />
    <Drawer
      title="Menü"
      placement="left"
      onClose={() => setDrawerVisible(false)}
      open={drawerVisible}
    >
      <Menu
        mode="vertical"
        selectedKeys={[selectedKey]}

        onClick={() => setDrawerVisible(false)}
        items={[
          { key: 'homepage', label: <Link to="/todopage">Ana Menü</Link> },
          { key: 'userspage', label: <Link to="/userspage">Kullanıcılar</Link> },
          { key: 'contact', label: <Link to="/contact">İletişim</Link> }
        ]}
      />
    </Drawer>
  </>
) : (
  <Menu
    className="menu-bar"
    mode="horizontal"
    selectedKeys={[selectedKey]}
    style={{ display: "flex", textAlign: 'center', justifyContent: "center" }}
    items={[
      { key: 'homepage', label: <Link to="/todopage">Ana Menü</Link> },
      { key: 'userspage', label: <Link to="/userspage">Kullanıcılar</Link> },
      { key: 'contact', label: <Link to="/contact">İletişim</Link> }
    ]}
  />
)}


      <div className="profile-settings-wrapper">
        <div className="profile-settings">
        
        <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
          <div className="settings-button">
          <Button icon={<SettingOutlined />} />
          </div>
        </Dropdown>
      </div>
      </div>
    </header>
  );
}

export default Header;
