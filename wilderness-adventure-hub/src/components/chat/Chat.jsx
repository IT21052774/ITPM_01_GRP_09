import React, { useState } from 'react';
import axios from 'axios';

function ChatComponent() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const handleChange = event => {
        setMessage(event.target.value);
    };

    const sendMessage = async () => {

        setMessages([...messages, { text: message, sender: 'user' }]);
        const result = await axios.post('http://localhost:1385/predict', { sentence: message });
        setMessages(prevMessages => [...prevMessages, { text: result.data.prediction.reply, sender: 'bot' }]);
        setMessage("");
        console.log(messages)
    };

    const styles = {
        chatContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: '#040C18',
            borderRadius: '15px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            color: '#81AFDD',
            padding: '20px',
            height: '600px',
            overflowY: 'auto',
            maxWidth: '600px',
            margin: '0 auto',
            fontFamily: 'var(--font-family)'
        },
        input: {
            width: '100%',
            padding: '10px',
            borderRadius: '10px',
            border: 'none',
            margin: '10px 0',
            color: '#81AFDD',
            backgroundColor: '#031B34',
        },
        button: {
            padding: '10px 20px',
            borderRadius: '10px',
            border: 'none',
            color: '#81AFDD',
            backgroundColor: '#042c54',
            cursor: 'pointer',
            margin: '10px 0',
        },
        userMessage: {
            alignSelf: 'flex-end',
            backgroundColor: '#042c54',
            borderRadius: '10px',
            padding: '10px',
            margin: '10px 0',
            maxWidth: '80%',
        },
        botMessage: {
            alignSelf: 'flex-start',
            backgroundColor: '#031B34',
            borderRadius: '10px',
            padding: '10px',
            margin: '10px 0',
            maxWidth: '80%',
        },
    };

    return (
        <div style={styles.chatContainer}>
            {messages.map((message, index) => (
                <div
                    key={index}
                    style={message.sender === 'user' ? styles.userMessage : styles.botMessage}
                >
                    {message.text}
                </div>
            ))}
            <input
                style={styles.input}
                type="text"
                value={message}
                onChange={handleChange}
                placeholder="Type a message"
            />
            <button style={styles.button} onClick={() => {
                sendMessage()
            }}>Send</button>
        </div>
    );
}

export default ChatComponent;
