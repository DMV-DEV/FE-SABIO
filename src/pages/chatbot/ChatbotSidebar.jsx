import React, { useState, useEffect, useRef } from 'react';
import { useGetHilosQuery } from '../../redux/chatApi';
import { useGetDocumentsByClassQuery, useGetDocumentsByHiloQuery, useUploadDocumentsMutation } from '../../redux/documentsApi';
import { UndoOutlined, FolderOpenOutlined, TeamOutlined, UploadOutlined } from '@ant-design/icons';
import { Dropdown, Menu, message, Upload } from 'antd';
import { useSelector } from 'react-redux';
import './StyleChatbot.css';

const ChatbotSidebar = ({ setSelectedHilo, selectedHilo }) => {
  const clase_id = useSelector((state) => state.classes.id);
  const { data: hilos = [], refetch: refetchHilos } = useGetHilosQuery(clase_id );
  const { data: documentsByClass = [], refetch: refetchDocumentsByClass } = useGetDocumentsByClassQuery(clase_id);
  const { data: documentsByHilo = [], refetch: refetchDocumentsByHilo} = useGetDocumentsByHiloQuery(selectedHilo, {
    skip: !selectedHilo,
  });
  const [uploadDocuments] = useUploadDocumentsMutation();
  const [isExpanded, setIsExpanded] = useState(false);
  const sidebarRef = useRef(null);
  console.log(clase_id)

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
          Hilo: {hilo.id}, creado: {hilo.fecha_creacion}, para la clase {hilo.clase_id}
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
      {Array.isArray(documentsByClass) ? documentsByClass.map(document => (
        <Menu.Item key={document.id} style={{ fontSize: 16 }}>
          id: {document.id} <a href={document.archivo} className="black-link">View pdf</a>
        </Menu.Item>
      )) : <Menu.Item>Sin documentos disponibles</Menu.Item>}
    </Menu>
  );

  const buttons = [
    { key: 'history', icon: <UndoOutlined />, text: 'History', dropdown: menuHistory },
    { key: 'uploads', icon: <FolderOpenOutlined />, text: 'My Uploads', dropdown: menuDocumentsByHilo },
    { key: 'documents', icon: <TeamOutlined />, text: 'Teacher’s uploaded', dropdown: menuDocumentsByClass }
  ];

  const props = {
    name: "file",
    customRequest: async ({ file }) => {
      if (!selectedHilo) {
        message.error("Please select a chat thread (hilo) first.");
        return;
      }

      try {
        await uploadDocuments({ hilo_id: selectedHilo, archivo: file }).unwrap();
        message.success(`${file.name} file uploaded successfully`);
        refetchDocumentsByHilo();
      } catch (error) {
        console.error("Error uploading document:", error);
        message.error(`${file.name} file upload failed.`);
      }
    },
    showUploadList: false,
  };

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
      <Upload {...props} className='chatbot__sidebar--upload'>
        <button className='chatbot__sidebar--upload'>
          {<UploadOutlined />}
          {isExpanded && <span>Upload Document</span>}
        </button>
      </Upload>
    </div>
  );
};

export default ChatbotSidebar;
