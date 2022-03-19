let socket = io();    // request from the frontend to the backend

        socket.on('connect', function () {
            console.log("Connected to server.");
        });

        socket.on('disconnect', function () {
            console.log("Disconnected from server.");
        });

        // client send a message to the "server.js file" --> have to be with the same name "newMessage". 
        // Sever will be EMIT the message in server.js file
        socket.on('newMessage', function (message) {
            console.log("newMessage", message);
        })