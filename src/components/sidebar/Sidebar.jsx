import React, { useState } from 'react';
import './StyleSidebar.css';
import Dropdown from './Dropdown';
import { AppstoreOutlined, TeamOutlined, ReadOutlined, CommentOutlined, FileDoneOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  // Sidebar collapse logic
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Sidebar selection logic
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState(null);
  const tipoUsuario = useSelector((state) => state.user.tipo_usuario);

  const handleClick = (id, path) => {
    setSelectedButton(id);
    navigate(path);
  };

  // Sidebar items for 'alumno' user type
  const alumnoItems = (
    <>
      <li>
        <button
          className={selectedButton === 1 ? 'sidebar__list--button-select' : 'sidebar__list--button'}
          onClick={() => handleClick(1, '/student')}>
          
          <AppstoreOutlined />
          Classes
        </button>
      </li>
      <li>
        <button
          className={selectedButton === 4 ? 'sidebar__list--button-select' : 'sidebar__list--button'}
          onClick={() => handleClick(4, '/chatbot')}>
          <CommentOutlined />
          AI Chatbot
        </button>
      </li>
    </>
  );

  // Sidebar items for other user types
  const defaultItems = (
    <>
      <li>
        <button
          className={selectedButton === 1 ? 'sidebar__list--button-select' : 'sidebar__list--button'}
          onClick={() => handleClick(1, '/dashboard')}>
          <AppstoreOutlined />
          Dashboard Analytics
        </button>
      </li>
      <li>
        <button
          className={selectedButton === 2 ? 'sidebar__list--button-select' : 'sidebar__list--button'}
          onClick={() => handleClick(2, '/documents')}>
          <ReadOutlined />
          Class Documents
        </button>
      </li>
      <li>
        <button
          className={selectedButton === 3 ? 'sidebar__list--button-select' : 'sidebar__list--button'}
          onClick={() => handleClick(3, '/students')}>
          <TeamOutlined />
          Students
        </button>
      </li>
      <li>
        <button
          className={selectedButton === 4 ? 'sidebar__list--button-select' : 'sidebar__list--button'}
          onClick={() => handleClick(4, '/chatbot')}>
          <CommentOutlined />
          AI Chatbot
        </button>
      </li>
      <li>
        <button
          className={selectedButton === 5 ? 'sidebar__list--button-select' : 'sidebar__list--button'}
          onClick={() => handleClick(5, '/checker')}>
          <FileDoneOutlined />
          AI Checker
        </button>
      </li>
    </>
  );

  return (
    <div>
      <button className="sidebar__toggle" onClick={toggleSidebar}>
        =
      </button>
      <aside className={`sidebar ${isCollapsed ? '' : 'collapsed'}`}>
        <div className='sidebar__content'>
          <div className='sidebar__header'>
            <img className='sidebar__header--logo' alt='logo' src='/logo.png' />
            <img className='sidebar__header--name' src='/name.png' />
          </div>
            {tipoUsuario === 'alumno' ? null :<Dropdown />}
          <ul className='sidebar__list'>
            <p className='sidebar__list--title'>Main menu</p>
            {tipoUsuario === 'alumno' ? alumnoItems : defaultItems}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;