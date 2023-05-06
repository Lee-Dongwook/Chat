module.exports = function(socketIo){
    socketIo.on("connection", function(socket){
        console.log("socket connection succeeded");

        socket.on("disconnect", reason => {
            console.log(`disconnect: ${reason}`);
        })
            const roomName = "room 1";

            socket.on("JOIN_ROOM", requestData => {
                socket.join(roomName);
                const responseData = {
                    ...requestData,
                    type: "JOIN_ROOM",
                    time: new Date(),
                };

                socketIo.to(roomName).emit("RECEIVE_MESSAGE",responseData);
                console.log(`JOIN_ROOM is fired with data: ${JSON.stringify(responseData)}`);
            })
            
            socket.on("UPDATE_NICKNAME", requestData => {
                const responseData = {
                    ...responseData,
                    type: "UPDATE_NICKNAME",
                    time: new Date(),
                };

                socketIo.to(roomName).emit("RECEIVE_MESSAGE", responseData);
                console.log(`UPDATE_NICKNAME is fired with data: ${JSON.stringify(responseData)}`);

            })
            
            socket.on("SEND_MESSAGE", requestData => {
                const responseData = {
                    ...requestData,
                    type: "SEND_MESSAGE",
                    time: new Date(),
                };
                socketIo.to(roomName).emit("RECEIVE_MESSAGE", responseData);
                console.log(`SEND_MESSAGE is fired with data: ${JSON.stringify(responseData)}`);
            })
        })
    }