import React, { useState } from 'react';
import './StyleChatbot.css';
import { SendOutlined , UndoOutlined, FileUnknownOutlined, FolderOpenOutlined, TeamOutlined, UploadOutlined } from '@ant-design/icons';

const Chatbot = () => {

    // const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const [isExpanded, setIsExpanded] = useState(false);
    const toggleSidebar = () => {
      setIsExpanded(!isExpanded);
  };
  
    // const sendMessage = async () => {
    //   if (input.trim() === '') return;
  
    //   const newMessage = {
    //     text: input,
    //     user: 'user'
    //   };
  
    //   setMessages([...messages, newMessage]);
    //   setInput('');
  
    //   try {
    //     const response = await axios.post('https://tu-backend-url.com/api/chatbot', { message: input });
    //     const botMessage = {
    //       text: response.data.reply,
    //       user: 'bot'
    //     };
    //     setMessages(prevMessages => [...prevMessages, botMessage]);
    //   } catch (error) {
    //     console.error('Error fetching response from chatbot:', error);
    //   }
    // };
  

    return(
        <div className="chatbot__container ">
            {/* <div className="chatbot__messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chatbot__message ${msg.user}`}>
            {msg.text}
          </div>
        ))}
      </div> */}
      <div className="chatbot__input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        //   onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
        />
        <button ><SendOutlined rotate={(-35)} /></button>
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
    )
};

export default Chatbot;