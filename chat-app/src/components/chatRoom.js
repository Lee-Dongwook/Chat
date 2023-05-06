import {useState, useCallback, useEffect, useContext, useRef} from 'react';

import { SocketContext, SOCKET_EVENT,makeMessage } from '../service/socket';
import MessageForm from "../components/MessageForm";

function ChatRoom({nickname}){
    const [messages, setMessages] = useState([]);
    const chatWindow = useRef(null);
    const socket = useContext(SocketContext);
    
    const moveScrollToReceiveMessage = useCallback(() => {
        if(chatWindow.current){
            chatWindow.current.scrollTo({
                top: chatWindow.current.scrollHeight,
                behavior: "smooth",
            });
        }
    },[]);

    const handleReceiveMessage = useCallback(pongData => {
        const newMessage = makeMessage(pongData);
        setMessages(messages => [...messages, newMessage]);
        moveScrollToReceiveMessage();
    },
    [moveScrollToReceiveMessage]
    );

    useEffect(() => {
        socket.on(SOCKET_EVENT.RECEIVE_MESSAGE, handleReceiveMessage);

        return() => {
            socket.off(SOCKET_EVENT.RECEIVE_MESSAGE,handleReceiveMessage);
        };
    }, [socket, handleReceiveMessage]);

    return(
        <div className="d-flex flex-column" style={{width:1000}}>
            <div className="text-box">
                <span>{nickname}</span>님 환영합니다!            
            </div>
            <div className="chat-window card" ref={chatWindow}>
                {messages.map((message, index) => {
                    const {nickname, content, time} = message;
                    return(
                        <div key={index} className="d-flex flex-row">
                          {nickname && <div className="message-nickname">{nickname}: </div>}
                        <div>{content}</div>
                        <div className="time">{time}</div>
                        </div>
                    );
                })}
            </div>
            <MessageForm nickname={nickname} />
        </div>
    );
}

export default ChatRoom;

