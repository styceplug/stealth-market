import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, query, orderBy, onSnapshot, doc, setDoc, serverTimestamp, runTransaction } from 'firebase/firestore';
import send from '../assets/images/send.svg';

const Chat = ({ userDetails }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const chatId = userDetails.email;

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const chatRef = doc(db, 'chats', chatId);
        const messagesRef = collection(chatRef, 'messages');

        // Use a transaction to ensure atomic operations
        await runTransaction(db, async (transaction) => {
          const chatDoc = await transaction.get(chatRef);
          
          if (!chatDoc.exists()) {
            // Create the chat document if it doesn't exist
            transaction.set(chatRef, {
              userId: userDetails.email,
              userName: userDetails.name,
              lastUpdated: serverTimestamp(),
              initialMessagesSent: false
            });
          }

          const existingChat = chatDoc.data();
          
          if (!existingChat || !existingChat.initialMessagesSent) {
            // Send initial messages only if they haven't been sent before
            if (userDetails.firstMessage) {
              transaction.set(doc(messagesRef), {
                text: userDetails.firstMessage,
                sender: userDetails.name,
                timestamp: serverTimestamp(),
                isInitialMessage: true
              });
            }

            // Add admin's response after the user's first message
            transaction.set(doc(messagesRef), {
              text: "Hello, how can I help you today?",
              sender: "Admin",
              timestamp: serverTimestamp(),
              isInitialMessage: true
            });

            // Mark initial messages as sent
            transaction.update(chatRef, { initialMessagesSent: true });
          }
        });

        console.log("Chat initialized and initial messages handled.");

        // Set up real-time listener for all messages
        const q = query(messagesRef, orderBy("timestamp", "asc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const fetchedMessages = snapshot.docs.map((doc) => doc.data());
          console.log("Fetched messages:", fetchedMessages);
          setMessages(fetchedMessages);
        });

        return unsubscribe;
      } catch (error) {
        console.error("Error initializing chat:", error);
      }
    };

    const unsubscribe = initializeChat();
    return () => {
      if (unsubscribe && typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [chatId, userDetails]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (message.trim()) {
      const messageData = {
        text: message,
        sender: userDetails.name,
        timestamp: serverTimestamp(),
      };

      try {
        console.log("Sending message:", messageData);
        await addDoc(collection(db, 'chats', chatId, 'messages'), messageData);
        
        // Update the last message timestamp in the chat document
        await setDoc(doc(db, 'chats', chatId), {
          lastUpdated: serverTimestamp()
        }, { merge: true });

        console.log("Message sent and chat updated:", messageData);
        setMessage('');
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).toLowerCase();
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className="message-wrapper">
            <div className="message-sender">
            {msg.sender !== userDetails.name && <strong>{msg.sender} </strong>}
            </div>
            <div
              className={`message ${msg.sender === userDetails.name ? 'my-message' : 'other-message'}`}
            >
              {msg.text}
            </div>
            <div className="message-timestamp">
              {formatTimestamp(msg.timestamp)}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="input-box"
        />
        <div className="buttons">
          <button type="submit" className="send-btn">
            <img src={send} alt="Send" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;






