import React, { useState } from 'react';
import './StyleSidebar.css';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
  
    const toggleSidebar = () => {
      setIsCollapsed(!isCollapsed);
    };
  
    return (
      <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
            =
          </button>
        <aside className={`sidebar ${isCollapsed ? '' : 'collapsed'}`}>
            <div className='sidebar__header'>
                <img className='sidebar__logo' alt='logo' src='/logo.png'/>
                <img className='sidebar__name' src='/name.png'/>
            </div>
          
          <ul className='sidebar__list'>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </aside>
      </>
    );
  };
export default Sidebar;