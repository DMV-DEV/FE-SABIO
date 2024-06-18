import React, { useState } from 'react';
import './StyleSidebar.css';
import Dropdown from './Dropdown';
import { AppstoreOutlined , TeamOutlined , ReadOutlined , CommentOutlined } from '@ant-design/icons';

const Sidebar = () => {

  // logica colapso sidebar
    const [isCollapsed, setIsCollapsed] = useState(false);
  
    const toggleSidebar = () => {
      setIsCollapsed(!isCollapsed);
    };


// logica selecciono opciones del sidebar
const [selectedButton, setSelectedButton] = useState(null);

  const handleClick = (id) => {
    setSelectedButton(id);
  };

  
  
    return (
      <div >
      <button className="sidebar__toggle" onClick={toggleSidebar}>
            =
          </button>
        <aside className={`sidebar ${isCollapsed ? '' : 'collapsed'}`}>
          <div className='sidebar__content'>
            <div className='sidebar__header'>
                <img className='sidebar__header--logo' alt='logo' src='/logo.png'/>
                <img className='sidebar__header--name' src='/name.png'/>
            </div>
           <Dropdown/>
   
          <ul className='sidebar__list'>
          <p className='sidebar__list--title'>Main menu</p>
            <li><button  
            className={selectedButton === 1 ? 'sidebar__list--button-select' : 'sidebar__list--button'}
            onClick={() => handleClick(1)}>
              <AppstoreOutlined />
              Dashboard Analytics
              </button></li>
              <li><button  
            className={selectedButton === 2 ? 'sidebar__list--button-select' : 'sidebar__list--button'}
            onClick={() => handleClick(2)}>
              <ReadOutlined />
              Class Documents
              </button></li>
              <li><button  
            className={selectedButton === 3 ? 'sidebar__list--button-select' : 'sidebar__list--button'}
            onClick={() => handleClick(3)}>
              <TeamOutlined />
              Students
              </button></li>
              <li><button  
            className={selectedButton === 4 ? 'sidebar__list--button-select' : 'sidebar__list--button'}
            onClick={() => handleClick(4)}>
              <CommentOutlined />
              AI Chatbot
              </button></li>
           
          </ul>
          </div>
        </aside>
      </div>
    );
  };
export default Sidebar;