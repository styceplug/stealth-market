import React, { useState, useEffect } from 'react';
import Chat from './Chat';
import close from '../assets/images/close-chat.svg';

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: '', email: '', firstMessage: '' });
  const [isChatStarted, setIsChatStarted] = useState(false);

  useEffect(() => {
    // Load user details and chat state from localStorage
    const storedUserDetails = localStorage.getItem('userDetails');
    const storedChatStarted = localStorage.getItem('isChatStarted');
    const storedIsOpen = localStorage.getItem('isOpen');

    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
    if (storedChatStarted) {
      setIsChatStarted(JSON.parse(storedChatStarted));
    }
    if (storedIsOpen) {
      setIsOpen(JSON.parse(storedIsOpen));
    }
  }, []);

  const toggleChat = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    localStorage.setItem('isOpen', JSON.stringify(newIsOpen));
  };

  const startChat = (e) => {
    e.preventDefault();
    setIsChatStarted(true);
    localStorage.setItem('isChatStarted', JSON.stringify(true));
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
  };

  const handleChange = (e) => {
    const newUserDetails = { ...userDetails, [e.target.name]: e.target.value };
    setUserDetails(newUserDetails);
  };

  return (
    <div>
      <div className="floating-chat-button" onClick={toggleChat}>
        💬
      </div>

      <div className={`floating-chat-window ${isOpen ? 'open' : 'closed'}`}>
        <div className="chat-header">
          <div className="head">
            <div className="profile">C</div>
            <h3>Customer Care</h3>
            <p>Chat with our customer care representatives for quick responses</p>
          </div>
          <span style={{ cursor: 'pointer' }} onClick={toggleChat}>
            <img src={close} alt="Close chat" />
          </span>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {!isChatStarted ? (
            <form onSubmit={startChat} className="user-details-form">
              <input
                type="text"
                name="name"
                value={userDetails.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
              <input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
              <input
                type="text"
                name="firstMessage"
                value={userDetails.firstMessage}
                onChange={handleChange}
                placeholder="Enter your message"
                required
                className="first-message"
              />
              <button type="submit">Start Chat</button>
            </form>
          ) : (
            <Chat userDetails={userDetails} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FloatingChat;


