// Chatbot.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetHilosQuery, useGetMessagesQuery, useCreateHiloMutation, useDeleteHiloMutation, usePostMessageMutation, useGetDocumentsQuery } from '../../redux/chatApi';
import { SendOutlined, UndoOutlined, FileUnknownOutlined, FolderOpenOutlined, TeamOutlined, UploadOutlined } from '@ant-design/icons';
import './StyleChatbot.css';

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

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };
  const handleButtonClick = (action) => {
    // Aquí puedes manejar la acción del botón, por ejemplo, cambiar de hilo, etc.
    console.log(action);
  };

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
      <div  
      ref={sidebarRef}  
      className={`chatbot__sidebar ${isExpanded ? 'expanded' : ''}`} 
      onClick={() => !isExpanded && toggleSidebar()}
      >
        <button className='chatbot__sidebar--button'  onClick={() => handleButtonClick('history')}>
          <UndoOutlined />
          {isExpanded && <span> History</span>}
        </button>
        <button className='chatbot__sidebar--button'  onClick={() => handleButtonClick('history')}>
          <FileUnknownOutlined />
          {isExpanded && <span> Quizzes</span>}
        </button>
        <button className='chatbot__sidebar--button'  onClick={() => handleButtonClick('My Uploads')}>
          <FolderOpenOutlined />
          {isExpanded && <span> My Uploads</span>}
        </button>
        <button className='chatbot__sidebar--button'  onClick={() => handleButtonClick('Teacher’s uploaded')}>
          <TeamOutlined />
          {isExpanded && <span> Teacher’s uploaded</span>}
        </button>
        <button className='chatbot__sidebar--upload'  onClick={() => handleButtonClick('Upload')}>
          <UploadOutlined />
          {isExpanded && <span> Upload document</span>}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
