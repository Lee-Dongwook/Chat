import {useState, useCallback, useContext} from 'react';

import {SocketContext, SOCKET_EVENT} from "../service/socket";

function MessageForm({nickname}) {
    const [typingMessage, setTypingMessage] = useState("");
    const socket = useContext(SocketContext);

    const handleChangeTypingMessage = useCallback(event => {
        setTypingMessage(event.target.value);

    },[]);

    const handleSendMessage = useCallback(() => {
        const noContent = typingMessage.trim() === "";

        if(noContent) {
            return;
        }

        socket.emit(SOCKET_EVENT.SEND_MESSAGE, {
            nickname,
            content: typingMessage,
        });

        setTypingMessage("");
    },[socket, nickname, typingMessage]);

    return(
        <form className="card">
            <div className="d-flex align-items-center">
                <textarea
                   className="form-control"
                   maxLength={1000}
                   autoFocus
                   value={typingMessage}
                   onChange={handleChangeTypingMessage}
                   onKeyPress = {event => {
                    if(event.code === "Enter"){
                        event.preventDefault();
                        handleSendMessage();
                    }
                   }}
                />
                <button type="button"
                  className="btn btn-primary send-btn"
                  onClick={handleSendMessage}
                >
                    전송
                </button>
            </div>
        </form>
    )
}
export default MessageForm;