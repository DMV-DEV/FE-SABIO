import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMessagesQuery, usePostMessageMutation, useCreateHiloMutation, useGetHilosQuery } from '../../redux/chatApi';
import { SendOutlined } from '@ant-design/icons';
import './StyleChatbot.css';
import ChatbotSidebar from './ChatbotSidebar';

const Chatbot = () => {
  const dispatch = useDispatch();
  const [selectedHilo, setSelectedHilo] = useState(null);
  const [page, setPage] = useState(1);
  const { data: messagesData = { mensajes: [] }, refetch: refetchMessages } = useGetMessagesQuery({ hilo_id: selectedHilo, hilo_page: page }, {
    skip: !selectedHilo,
  });

  
  const { refetch: refetchHilos } = useGetHilosQuery();
  const [postMessage] = usePostMessageMutation();
  const [createHilo] = useCreateHiloMutation();
  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const sidebarRef = useRef(null);
  const messagesEndRef = useRef(null);
  const class_id = useSelector((state) => state.classes.id);
  const Token = useSelector((state) =>state.user.accessToken );
  console.log(messagesData);
  console.log(Token, class_id);

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

  useEffect(() => {
    scrollToBottom();
  }, [messagesData]);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    try {
      if (!selectedHilo) {
        // Crear un nuevo hilo y enviar el mensaje
        const newHilo = await createHilo({class_id}).unwrap();
        setSelectedHilo(newHilo.hilo_id);
        await postMessage({ hilo_id: newHilo.hilo_id, message: input });
        refetchHilos();
      } else {
        // Enviar el mensaje en el hilo seleccionado
        await postMessage({ hilo_id: selectedHilo, message: input });
      }

      setInput('');
      refetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
      console.error('Error details:', error.data);
      // Manejar errores según sea necesario
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="chatbot__container">
    
      <div className="chatbot__content">
        <div className="chatbot__messages">
        {selectedHilo && messagesData.mensajes.slice().reverse().map((msg, index)=> (
            <div key={index} className={`chatbot__message ${msg.es_del_bot === 'assistant' ? 'bot' : 'user'}`}>
              <div className="chatbot__message-header">
                <div className={`icon ${msg.es_del_bot === 'assistant' ? 'bot-icon' : 'user-icon'}`}>
                  {/* Aquí puedes poner el icono correspondiente */}
                </div>
                <div className="time">
                  {/* Aquí puedes poner la hora y la fecha del mensaje */}
                  {new Date(msg.timestamp).toLocaleString()}
                </div>
              </div>
              <div className="chatbot__message-text">
                {msg.texto}
              </div>
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
      </div>
      <ChatbotSidebar setSelectedHilo={setSelectedHilo} />
    </div>
  );
};

export default Chatbot;
