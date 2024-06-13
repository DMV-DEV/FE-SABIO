import React, { useState } from 'react';
import './App.css'; // Archivo CSS para estilos personalizados

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  // Función para manejar el colapso del sidebar
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="app">
      <header className="header">Header</header>
      <div className={`container ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar">
          <button className="toggle-btn" onClick={toggleCollapsed}>
            {collapsed ? 'Expandir' : 'Colapsar'}
          </button>
          Sidebar
        </div>
        <div className="content">Content</div>
      </div>
      <footer className="footer">Footer</footer>
    </div>
  );
};

export default App;
