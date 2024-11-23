import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Your server URL

const ProductChat = ({ productId, userId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Join the room when the component mounts
    socket.emit('joinRoom', productId);

    // Listen for new messages
    socket.on('getMsg', (newMessages) => {
      setMessages(newMessages);
    });

    // Clean up the listener when the component unmounts
    return () => {
      socket.off('getMsg');
    };
  }, [productId]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Emit sendMsg with the productId and userId
      socket.emit('sendMsg', { productId, message, userId });
      setMessage('');
    }
  };

  return (
    <div>
      <div>
        <h3>Chat about this product</h3>
        <div>
          {messages.map((msg, index) => (
            <div key={index}>
              <strong>User {msg.userId}: </strong> {msg.message}
            </div>
          ))}
        </div>
      </div>
      <div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ProductChat;
