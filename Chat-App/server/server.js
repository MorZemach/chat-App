const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const publicPath = path.join(__dirname, "/../public");
const port = process.env.PORT || 3000
let app = express();
let server = http.createServer(app);
let io = socketio(server);

app.use(express.static(publicPath));

// backend listening to the connection that the frontend ask from him (in index.html file)
// when user will be looking for "localhost:3000" he will be connected (the front will send the back the message and the back will listening)
io.on('connection', (socket) => {
    console.log("A new user just connected");

    socket.on('disconnect', () => {
        console.log("User was disconnected from server.");
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})
