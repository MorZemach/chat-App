const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message');

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
    // When a user is connect the app I can know his socket id using "socket.id" like the console. 
    // It's the same socket id the client side got.
    // We should save it to the database
    console.log("Your socket id is: " + socket.id);

    //----------------------- socket is for only one user || io is for all users at the same time ---------------------------//
    // Server make a new message and send it to the client
    // every users that connect the sever ('localhost:3000') will be get this message when he'll connect.
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined!'));

    socket.on('createMessage', (message, callback) => {
        console.log("createMessage", message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is the server!');
    })

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin',
        coords.lat, coords.lng))
    })

    socket.on('disconnect', () => {
        console.log("User was disconnected from server.");
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})
