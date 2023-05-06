import {createContext} from 'react';
import socektIo from "socket.io-client";
import dayjs from "dayjs";

export const socket = socektIo("http://localhost:4000",{withCredentials: true});
export const SocketContext = createContext(socket);
export const SOCKET_EVENT = {
    JOIN_ROOM : "JOIN_ROOM",
    UPDATE_NICKNAME: "UPDATE_NICKNAME",
    SEND_MESSAGE: "SEND_MESSAGE",
    RECEIVE_MESSAGE: "RECEIVE_MESSAGE",
};

export const makeMessage = pongData => {
    const {prevNickname, nickname, content, type, time} = pongData;

    let nicknameLabel;
    let contentLabel = "";

    switch(type){
        case SOCKET_EVENT.JOIN_ROOM: {
            contentLabel = `${nickname} 님이 참여하셨습니다.`;
            break;
        }
        case SOCKET_EVENT.UPDATE_NICKNAME: {
            contentLabel = `사용자의 이름이 변경되었습니다.\n ${prevNickname} => ${nickname}`;
            break;
        }
        case SOCKET_EVENT.SEND_MESSAGE: {
            contentLabel = String(content);
            nicknameLabel = nickname;
            break;
        }
        default:
    }

    return{
        nickname: nicknameLabel,
        content: contentLabel,
        time: dayjs(time).format("HH:mm"),
    };
};


socket.on("connect", () => {
    console.log("socket server connected");
});

socket.on("disconnect", () => {
    console.log("socket server disconnected");
})

