// Chatbot.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetHilosQuery, useGetMessagesQuery, useCreateHiloMutation, useDeleteHiloMutation, usePostMessageMutation, useGetDocumentsQuery } from '../../redux/chatApi';
import { SendOutlined, UndoOutlined, FileUnknownOutlined, FolderOpenOutlined, TeamOutlined, UploadOutlined } from '@ant-design/icons';
import './StyleChatbot.css';
import ChatbotSidebar from './ChatbotSidebar';

import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Space, Avatar, Button, Menu } from 'antd';

const Chatbot = () => {
  const dispatch = useDispatch();
  const { data: hilos = [], refetch: refetchHilos } = useGetHilosQuery();
  const [selectedHilo, setSelectedHilo] = useState(null);
  const [page, setPage] = useState(1);
  const { data: messagesData = { mensajes: [] }, refetch: refetchMessages } = useGetMessagesQuery({ hilo_id: selectedHilo, hilo_page: page }, {
    skip: !selectedHilo,
  });
  const [postMessage] = usePostMessageMutation();
  const [input, setInput] = useState('');
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

  const handleSendMessage = async () => {
    if (input.trim() === '' || !selectedHilo) return;

    await postMessage({ message: input });
    setInput('');
    refetchMessages();
  };

  

  return (
    <div className="chatbot__container">
      <div className="chatbot__messages">
        {selectedHilo && messagesData.mensajes.map((msg, index) => (
          <div key={index} className={`chatbot__message ${msg.es_del_bot}`}>
            {msg.texto}
          </div>
        ))}
      </div>
      <div className="chatbot__input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}><SendOutlined rotate={-35} /></button>
      </div>
      <ChatbotSidebar />
    </div>
  );
};

export default Chatbot;
