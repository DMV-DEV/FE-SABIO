import React, { useState } from 'react';
import './StyleSidebar.css';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
  
    const toggleSidebar = () => {
      setIsCollapsed(!isCollapsed);
    };

    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
      setSelectedOption(event.target.value);
    };
  
  
    return (
      <div >
      <button className="sidebar-toggle" onClick={toggleSidebar}>
            =
          </button>
        <aside className={`sidebar ${isCollapsed ? '' : 'collapsed'}`}>
          <div className='sidebar__content'>
            <div className='sidebar__header'>
                <img className='sidebar__header--logo' alt='logo' src='/logo.png'/>
                <img className='sidebar__header--name' src='/name.png'/>
            </div>
            <div className="dropdown-container">
      
      <select id="dropdown" value={selectedOption} onChange={handleChange}>
        <option value="">Select a class</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      
    </div>
          <ul className='sidebar__list'>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
          </div>
        </aside>
      </div>
    );
  };
export default Sidebar;