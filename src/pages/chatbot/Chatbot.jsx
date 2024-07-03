// Chatbot.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetHilosQuery, useGetMessagesQuery, usePostMessageMutation } from '../../redux/chatApi';
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

  useEffect(() => {
    if (selectedHilo) {
      refetchMessages();
    }
  }, [selectedHilo, page, refetchMessages]);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
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
      <div className={`chatbot__sidebar ${isExpanded ? 'expanded' : ''}`} onClick={toggleSidebar}>
        <button className='chatbot__sidebar--button'>
          <UndoOutlined />
          {isExpanded && <span> History</span>}
        </button>
        <button className='chatbot__sidebar--button'>
          <FileUnknownOutlined />
          {isExpanded && <span> Quizzes</span>}
        </button>
        <button className='chatbot__sidebar--button'>
          <FolderOpenOutlined />
          {isExpanded && <span> My Uploads</span>}
        </button>
        <button className='chatbot__sidebar--button'>
          <TeamOutlined />
          {isExpanded && <span> Teacher’s uploaded</span>}
        </button>
        <button className='chatbot__sidebar--upload'>
          <UploadOutlined />
          {isExpanded && <span> Upload document</span>}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
