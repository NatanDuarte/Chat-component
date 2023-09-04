import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface ChatProps {
    server: string;
    username: string;
    roomName: string;
}

interface Message {
    username: string;
    message: string;
}

const Chat: React.FC<ChatProps> = ({ server, username, roomName }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        // Conectar ao servidor Socket.io
        const newSocket = io(server);
        setSocket(newSocket);

        // Lidar com mensagens recebidas
        newSocket.on('message', (msg: string) => {
            const receivedMessage = JSON.parse(msg) as Message;
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });

        return () => {
            // Desconectar o socket quando o componente é desmontado
            newSocket.disconnect();
        };
    }, [server]);

    const sendMessage = () => {
        if (socket && message.trim() !== '') {
            // Enviar mensagem para o servidor
            const messageObject = { username, message, roomName };
            socket.emit('message', JSON.stringify(messageObject));
            setMessage('');
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div>
            <h1>Chat</h1>
            <div className="chat-container">
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div key={index}>
                            <strong>{msg.username}: </strong>
                            {msg.message}
                        </div>
                    ))}
                </div>
                <div className="chat-input">
                    <input
                        type="text"
                        placeholder="Digite sua mensagem..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <button onClick={sendMessage}>Enviar</button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
