import React, { useState, useEffect, useRef } from 'react';
import { useGetHilosQuery } from '../../redux/chatApi';
import { useGetDocumentsQuery, useGetDocumentsByHiloQuery, useUploadDocumentsMutation } from '../../redux/documentsApi';
import { UndoOutlined, FolderOpenOutlined, TeamOutlined, UploadOutlined } from '@ant-design/icons';
import { Dropdown, Menu, message, Upload } from 'antd';
import './StyleChatbot.css';

const ChatbotSidebar = ({ setSelectedHilo, selectedHilo }) => {
  const { data: hilos = [], refetch: refetchHilos } = useGetHilosQuery();
  const { data: documentsByclass = [], refetch: refetchDocumentsByclass } = useGetDocumentsQuery();
  const { data: documentsByHilo = [], refetch: refetchDocumentsByHilo } = useGetDocumentsByHiloQuery(selectedHilo);
  const [uploadDocuments] = useUploadDocumentsMutation();
  const [isExpanded, setIsExpanded] = useState(false);
  const sidebarRef = useRef(null);
  // const [selectedHilo, setSelectedHilo] = useState()

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

  console.log(selectedHilo)

  const menuDocumentsByHilo = (
    <Menu>
      {documentsByHilo.map(upload => (
        <Menu.Item key={upload.id} style={{ fontSize: 16 }}>
          {upload.id} <a href={upload.archivo} className="black-link">View pdf</a>
        </Menu.Item>
      ))}
    </Menu>
  );

  const menuDocumentsByClass = (
    <Menu>
      {documentsByclass.map(document => (
        <Menu.Item key={document.id} style={{ fontSize: 16 }}>
          id: {document.id} <a href={document.archivo} className="black-link">View pdf</a>
        </Menu.Item>
      ))}
    </Menu>
  );

  const buttons = [
    { key: 'history', icon: <UndoOutlined />, text: 'History', dropdown: menuHistory },
    { key: 'uploads', icon: <FolderOpenOutlined />, text: 'My Uploads', dropdown: menuDocumentsByHilo },
    { key: 'documents', icon: <TeamOutlined />, text: 'Teacher’s uploaded', dropdown: menuDocumentsByClass }
  ];

  const props = {
    name: "file",
    action: async (file) => {
      if (!selectedHilo) {
        message.error("Please select a chat thread (hilo) first.");
        return;
      }

      const formData = new FormData();
      formData.append('hilo_id', selectedHilo);
      formData.append('archivo', file);

      try {
        await uploadDocuments({ formData }).unwrap();
        message.success(`${file.name} file uploaded successfully`);
        refetchDocumentsByHilo();
      } catch (error) {
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
