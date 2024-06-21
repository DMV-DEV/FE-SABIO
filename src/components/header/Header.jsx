import React from 'react';
import { DownOutlined, UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { Dropdown, Space, Avatar } from 'antd';
import './StyleHeader.css';

const Header = () => {
  const items = [
    {
      label: <a href="/account">Account settings</a>,
      key: '0',
      icon: <SettingOutlined size={20} />
    },
    {
      label: <a href="/login">Logout</a>,
      key: '1',
      icon: <LogoutOutlined size={20} />
    },
    
  ];
  return (
    <header className="header">
      <div className="header__paths">
        <p>Dashboard  / Account Settings</p>
      </div>
      <Dropdown
    menu={{
      items,
    }}
    trigger={['click']}
    className="header__dropdownMenu"
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        <div>
        <p className="header__user-info">Username</p>
        <p className="header__user-info">School Code: 1235</p>
        </div>
        <Avatar size={50} icon={<UserOutlined/>} />
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
    </header>
  );
};

export default Header;