import { useState, useEffect } from 'react';
import { Avatar, Dropdown, Menu, Button, Popconfirm, message } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import Logo from '../images/mayduu-black.png';
import { useNavigate } from "react-router-dom";

function Header({ user }) {
  const [usergender, setUserGender] = useState("👨🏻");
  const navigate = useNavigate();
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
    message.success('Çıkış yapıldı.');
  };

  const menu = (
    <Menu style={{marginTop: "30px"}}>
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

  return (
    <header className="header-app" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', background: '#f5f5f5' }}>
      <div className="logo">
        <a href="/todopage">
          <img src={Logo} alt="mayduu logo"/>
        </a>
      </div>
      <div className="profile-settings" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Avatar style={{ backgroundColor: '#ffffffff' }} size="large">
          {usergender}
        </Avatar>
        <b>{user}</b>
        <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
          <Button icon={<SettingOutlined />} />
        </Dropdown>
      </div>
    </header>
  );
}

export default Header;
