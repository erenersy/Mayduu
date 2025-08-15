import { useState, useEffect } from 'react';
import { Avatar, Dropdown, Menu, Button, Popconfirm,Drawer, Switch } from 'antd';
import {SettingOutlined, MenuOutlined } from '@ant-design/icons';
import Logo from '../images/mayduu-black.png';
import LogoDark from '../images/mayduu-white.png';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { CloseOutlined } from '@ant-design/icons';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { LanguageContext } from '../contexts/LanguageContext';
import translations from './Translations';




function Header({ user }) {

  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const t = translations[language];


const [drawerVisible, setDrawerVisible] = useState(false);

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

  
    <Menu theme={theme} style={{marginTop: "30px", paddingRight: "15px"}}>
              <Avatar style={{ backgroundColor: '#ffffffff' }} size="large">
          {usergender}
        </Avatar>
        <b>{t.welcome} {user}</b>
      <Menu.Item key="edit" onClick={handleProfileEdit} >

        <Button className='button' type='none'>{t.profileEdit}</Button>
        
      </Menu.Item>
      <Menu.Item key="logout">
        <Popconfirm 

          placement="bottom"
          title={t.logoutConfirm}
          
          onConfirm={handleLogoutConfirm}
          okText = {t.yes}
          cancelText={t.no}
            okButtonProps={{ className: "button", type: "none"}}
  cancelButtonProps={{ className: "button", type: "none" }}
          
        >
          <Button className='button' type='none' style={{ display: 'flex', textAlign: 'center' }}>
  {t.logout}
</Button>
        </Popconfirm>
      </Menu.Item>
      <Menu.Item key="theme">

        
</Menu.Item>

<ThemeToggle />
    </Menu>
  );

  const selectedKey = (() => {
  if (location.pathname === '/todopage') return 'homepage';
  if (location.pathname === '/userspage') return 'userspage';
  if (location.pathname === '/contact') return 'contact';
  
  return '';
})();


  return (

    

    
<header className={`header-app ${theme === 'dark' ? 'header-app-dark' : ''}`}>
  <div className="logo">
    <Link to="/todopage">
      <img src={theme === 'dark' ? LogoDark : Logo} alt="mayduu logo" />
    </Link>
  </div>

  {/* Yatay menü */}
  <div className="menu-wrapper">
  <Menu
    theme={theme}
    className="menu-bar"
    mode="horizontal"
    selectedKeys={[selectedKey]}
    items={[
      { key: 'homepage', label: <Link to="/todopage">{t.home}</Link> },
      { key: 'userspage', label: <Link to="/userspage">{t.users}</Link> },
      { key: 'contact', label: <Link to="/contact">{t.contact}</Link> },
    ]}
  />
  </div>
  

  {/* Hamburger buton */}
  <Button
    className="hamburger-button"
    icon={<MenuOutlined />}
    onClick={() => setDrawerVisible(true)}
  />

  {/* Drawer */}
  <Drawer
    className={theme === 'dark' ? 'drawer-dark' : ''}
    placement="left"
    onClose={() => setDrawerVisible(false)}
    open={drawerVisible}
    closeIcon={<CloseOutlined style={{ color: theme === 'dark' ? '#fff' : '#000' }} />}
  >
    <Menu
    className='"horizantal-menu'
      mode="vertical"
      selectedKeys={[selectedKey]}
      onClick={() => setDrawerVisible(false)}
      
      items={[
        
        { key: 'homepage', label: <Link to="/todopage">{t.home}</Link> },
        { key: 'userspage', label: <Link to="/userspage">{t.users}</Link> },
        { key: 'contact', label: <Link to="/contact">{t.contact}</Link> },

      ]}
    />
  </Drawer>

  <div className="control-panel">
    <LanguageToggle />
    <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
      <Button style={{marginLeft: "auto"}}icon={<SettingOutlined />} />
    </Dropdown>
  </div>
</header>
  );
}

export default Header;
