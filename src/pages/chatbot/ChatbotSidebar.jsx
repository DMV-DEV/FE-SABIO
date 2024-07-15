// Chatbot.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetHilosQuery, useGetMessagesQuery, useCreateHiloMutation, useDeleteHiloMutation, usePostMessageMutation, useGetDocumentsQuery } from '../../redux/chatApi';
import { SendOutlined, UndoOutlined, FileUnknownOutlined, FolderOpenOutlined, TeamOutlined, UploadOutlined } from '@ant-design/icons';
import './StyleChatbot.css';

import { Dropdown, Upload ,  message, Button, Menu } from 'antd';

const ChatbotSidebar = () => {
  const dispatch = useDispatch();
  const { data: hilos = [], refetch: refetchHilos } = useGetHilosQuery();
  const [selectedHilo, setSelectedHilo] = useState(null);
  const [page, setPage] = useState(1);
  const { data: messagesData = { mensajes: [] }, refetch: refetchMessages } = useGetMessagesQuery({ hilo_id: selectedHilo, hilo_page: page }, {
    skip: !selectedHilo,
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (selectedHilo) {
      refetchMessages();
    }
  }, [selectedHilo, page, refetchMessages]);

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

  const handleButtonClick = (action) => {
    console.log(action);
  };

  const hiloss = [
    {
      "hilo_id": "3",
      "mensajes": [
        {
          "id": 18,
          "texto": "Me llamo SABIO. Estoy aquí para ayudarte con cualquier consulta relacionada con tus estudios. ¿En qué puedo asistirte hoy?",
          "es_del_bot": "assistant",
          "timestamp": "2024-06-27 17:03:55"
        },
        {
          "id": 17,
          "texto": "como te llamas?",
          "es_del_bot": "user",
          "timestamp": "2024-06-27 17:03:52"
        }
      ],
      "is_last_page": true
    }
  ];

  const uploads = [
    {
      "id": 2,
      "archivo": "uploads/id-1/hilo_id-3/Proceso_Revision_de_Local_-_Flujograma.pdf"
    },
    {
      "id": 4,
      "archivo": "uploads/id-1/hilo_id-3/download.png"
    }
  ];

  const teachers = [
    {
    "id": 1,
    "archivo": "uploads/__id-1/clase_id-7/download.png"
    }
    ]

  const menuHistory = (
    <Menu>
      {hiloss.map(hilo => (
        <Menu.Item key={hilo.hilo_id} style={{ fontSize: 16 }}>
          {hilo.hilo_id}
        </Menu.Item>
      ))}
    </Menu>
  );

  const menuUploads = (
    <Menu>
      {uploads.map(upload => (
        <Menu.Item key={upload.id} style={{ fontSize: 16 }}>
          {upload.id} <a href={upload.archivo} className="black-link"> View pdf</a>
        </Menu.Item>
      ))}
    </Menu>
  );

  const menuTeachers = (
    <Menu>
      {teachers.map(teacher => (
        <Menu.Item key={teacher.id} style={{ fontSize: 16 }}>
          id: {teacher.id}
           <a href={teacher.archivo} className="black-link"> View pdf</a>
        </Menu.Item>
      ))}
    </Menu>
  );

  const buttons = [
    {
      key: 'history',
      icon: <UndoOutlined />,
      text: 'History',
      dropdown: menuHistory,
      
    },
    {
      key: 'uploads',
      icon: <FolderOpenOutlined />,
      text: 'My Uploads',
      dropdown: menuUploads,
      
    },
    {
      key: 'teachersUploaded',
      icon: <TeamOutlined />,
      text: 'Teacher’s uploaded',
      dropdown: menuTeachers,
     
    },
 
  ];

  const props = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
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
              <button  className='chatbot__sidebar--upload'>
              { <UploadOutlined />}
              {isExpanded && <span>Upload Document</span>}
              </button>
            </Upload>
    </div>
  );
};

export default ChatbotSidebar;
