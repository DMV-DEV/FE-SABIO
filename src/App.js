import React from 'react';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import SidebarNoClass from './components/sidebar/SidebarNoClass';
import './App.css';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const App = () => {
  const location = useLocation();
  const tipoUsuario = useSelector((state) => state.user.tipo_usuario);
  const isMyClassesRoute = location.pathname === '/';
  
  let sidebarComponent;
  if (tipoUsuario === 'alumno') {
    sidebarComponent = <Sidebar />;
  } else {
    sidebarComponent = isMyClassesRoute ? <SidebarNoClass /> : <Sidebar />;
  }
  
  return (
    <>
      <div className="app">
        {sidebarComponent}
        <div className='main_container'>
          <Header />
          <div className='body'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;