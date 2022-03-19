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

    //----------------------- socket is for only one user || io is for all users at the same time ---------------------------//
    // Server make a new message and send it to the client
    // every users that connect the sever ('localhost:3000') will be get this message when he'll connect.
    socket.emit('newMessage', {
        from: "Admin",
        text: "Welcome to the chat app!",
        createdAt: new Date().getTime()
    })

    socket.broadcast.emit('newMessage', {
        from: "Admin",
        text: "New user joined!",
        createdAt: new Date().getTime()
    })

    socket.on('createMessage', (message) => {
        console.log("createMessage", message);
        io.emit('newMessage', {
            from: message.from, 
            text: message.text,
            createdAt: new Date().getTime()
        })
    })

    socket.on('disconnect', () => {
        console.log("User was disconnected from server.");
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})
