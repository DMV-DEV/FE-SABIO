import React, { useState } from 'react';
import './StyleSidebar.css';
import Dropdown from './Dropdown';

const SidebarNoClass = () => {

    const [isCollapsed, setIsCollapsed] = useState(false);
  
    const toggleSidebar = () => {
      setIsCollapsed(!isCollapsed);
    };


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
   
          <div className='sidebar__noclass'>
          <p className='sidebar__noclass--text'>You must select a class to see this menu.</p>
            
           
          </div>
          </div>
        </aside>
      </div>
    );
  };
export default SidebarNoClass;