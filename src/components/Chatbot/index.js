
import React, { useState } from 'react';
import { getChatbotResponse } from '../../chatbot-logic';
import styles from './styles.module.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newMessages = [...messages, { text: inputValue, sender: 'user' }];
    setMessages(newMessages);

    const chatbotResponse = getChatbotResponse(inputValue);
    const newMessagesWithBot = [...newMessages, { text: chatbotResponse, sender: 'bot' }];
    setMessages(newMessagesWithBot);

    setInputValue('');
  };

  return (
    <div className={styles.chatbotContainer}>
      {isOpen && (
        <div className={styles.chatbotPopup}>
          <div className={styles.chatbotHeader}>
            <h2>Physical AI Chatbot</h2>
            <button onClick={toggleChatbot} className={styles.closeButton}>&times;</button>
          </div>
          <div className={styles.chatbotMessages}>
            {messages.map((message, index) => (
              <div key={index} className={`${styles.message} ${styles[message.sender]}`}>
                {message.text}
              </div>
            ))}
          </div>
          <div className={styles.chatbotInput}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask a question..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
      <div className={styles.chatbotBubble} onClick={toggleChatbot}>
        <span>?</span>
      </div>
    </div>
  );
};

export default Chatbot;
