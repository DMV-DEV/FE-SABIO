import React from 'react';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import SidebarNoClass from './components/sidebar/SidebarNoClass';
import './App.css';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

 
const App = () => {
  
  const location = useLocation();
  const isMyClassesRoute = location.pathname === '/myclasses';
  return (
    <>
    <div className="app">
    {isMyClassesRoute ? <SidebarNoClass /> : <Sidebar />}
    <div className='main_container'>
      <Header />
    <div className='body'>
      <Outlet/>
      </div>
    </div>
    </div>
    </>
  );
};

export default App;