const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const socketIo = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});
const socket = require("./index");
const port = 4000;

app.use(cors({origin: "http://localhost:3000", credentials: true}));
socket(socketIo);

server.listen(port, ()=> {
    console.log(`server is running on http://localhost:4000.${new Date().toLocaleString()}`);
});

