import React from 'react';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Space, Avatar, Button, Menu } from 'antd';
import './StyleHeader.css';
import { SettingIcon } from '../../assets/icons/Settings';
// import { IacheckerIcon } from '../../assets/icons/IaChecker';
import { LogoutIcon } from '../../assets/icons/LogoutIcon';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  let pathText = '';
  if (location.pathname === '/dashboard') {
    pathText = 'Analytics';
  } else if (location.pathname === '/myclasses') {
    pathText = 'My classes';
  } else if (location.pathname === '/documents') {
    pathText = 'Classes';
  } else if (location.pathname === '/accountsettings') {
    pathText = 'Account settings';
  } else if (location.pathname === '/checker') {
    pathText = 'AI checker';
  } else if (location.pathname === '/students') {
    pathText = 'Students';
  }
  const items = [
    {
      label: <a href="/accountsettings" className='link'>Account settings</a>,
      key: '0',
      icon: <SettingIcon />
    },
    // {
    //   label: <a href="/checker" className='link'>AI Checker</a>,
    //   key: '1',
    //   icon: <IacheckerIcon />
    // }
  ];

  const menu = (
    <Menu>
      {items.map(item => (
        <Menu.Item key={item.key} icon={item.icon} style={{ fontSize: 16 }}>
          {item.label}
        </Menu.Item>
      ))}
      <Menu.Item key="logout" style={{ textAlign: 'center' }}>
        <Button
          type="primary"
          href="/authentication"
          style={{
            backgroundColor: '#EF8F37',
            borderColor: '#EF8F37',
            display: 'flex',
            alignItems: 'start',
            justifyContent: 'start',
            fontSize: 16,
          }}
        >
          <LogoutIcon style={{ marginRight: 8 }} />
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="header">
      <div className="header__paths">
        <p><div className="header__paths">
        Dashboard /  <span style={{ color: '#1C4B82' }}>{pathText}</span>
      </div></p>
      </div>
      <Dropdown overlay={menu} trigger={['click']} className="header__dropdownMenu">
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <div>
              <p className="header__user-info">Username</p>
              <p className="header__user-info">School Code: 1235</p>
            </div>
            <Avatar size={50} icon={<UserOutlined />} />
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </header>
  );
};

export default Header;