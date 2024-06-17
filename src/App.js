import React from 'react';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Footer from './components/footer/Footer';
import './App.css';
import CardComponent from './components/cards/CardComponent';
import Classes from './pages/MyClasses/Classes';

 
const App = () => {
  return (
    <>
    <div className="app">
    <Sidebar />
    <div className='main_container'>
      <Header />
      <div className='body'>
        <Classes />
      </div>
      {/* <Footer /> */}
    </div>
    </div>
    </>
  );
};

export default App;