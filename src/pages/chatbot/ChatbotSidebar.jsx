import React, { useState, useEffect, useRef } from 'react';
import { useGetHilosQuery } from '../../redux/chatApi';
import { useGetDocumentsQuery, useGetDocumentsByHiloQuery, useUploadDocumentsMutation } from '../../redux/documentsApi';
import { UndoOutlined, FolderOpenOutlined, TeamOutlined, UploadOutlined } from '@ant-design/icons';
import { Dropdown, Menu, message, Upload } from 'antd';
import {  useSelector } from 'react-redux';
import './StyleChatbot.css';

const ChatbotSidebar = ({ setSelectedHilo, selectedHilo }) => {
  const clase_id = useSelector((state) => state.classes.id);
  const { data: hilos = [], refetch: refetchHilos } = useGetHilosQuery();
  const { data: documentsByclass = [], refetch: refetchDocumentsByclass } = useGetDocumentsQuery(clase_id);
  const { data: documentsByHilo = [], refetch: refetchUploadsByHilo } = useGetDocumentsByHiloQuery(selectedHilo, {
    skip: !selectedHilo,
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const sidebarRef = useRef(null);
  console.log(documentsByHilo, documentsByclass )  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarRef]);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const menuHistory = (
    <Menu>
      {hilos.map(hilo => (
        <Menu.Item key={hilo.id} style={{ fontSize: 16 }} onClick={() => setSelectedHilo(hilo.id)}>
          Hilo: {hilo.id}, creado: {hilo.fecha_creacion}
        </Menu.Item>
      ))}
    </Menu>
  );

  const menuDocumentsByHilo = (
    <Menu>
      {Array.isArray(documentsByHilo) ? documentsByHilo.map(upload => (
        <Menu.Item key={upload.id} style={{ fontSize: 16 }}>
          {upload.id} <a href={upload.archivo} className="black-link">View pdf</a>
        </Menu.Item>
      )) : <Menu.Item>Sin documentos disponibles</Menu.Item>}
    </Menu>
  );

  const menuDocumentsByClass = (
    <Menu>
      {Array.isArray(documentsByclass) ? documentsByclass.map(document => (
        <Menu.Item key={document.id} style={{ fontSize: 16 }}>
          id: {document.id} <a href={document.archivo} className="black-link">View pdf</a>
        </Menu.Item>
      )) : <Menu.Item>Sin documentos disponibles</Menu.Item>}
    </Menu>
  );

  const buttons = [
    { key: 'history', icon: <UndoOutlined />, text: 'History', dropdown: menuHistory },
    { key: 'uploads', icon: <FolderOpenOutlined />, text: 'My Uploads', dropdown: menuDocumentsByHilo },
    { key: 'documents', icon: <TeamOutlined />, text: 'Teacher’s uploaded', dropdown: menuDocumentsByClass}
  ];

  return (
    <div
      ref={sidebarRef}
      className={`chatbot__sidebar ${isExpanded ? 'expanded' : ''}`}
      onClick={() => !isExpanded && toggleSidebar()}
    >
      {buttons.map(button => (
        <Dropdown key={button.key} overlay={button.dropdown} trigger={['click']} className="header__dropdownMenu">
          <button
            className={`chatbot__sidebar--button `}
            onClick={(e) => e.preventDefault()}
          >
            {button.icon}
            {isExpanded && <span>{button.text}</span>}
          </button>
        </Dropdown>
      ))}
    </div>
  );
};

export default ChatbotSidebar;
