const applyTo = (app, data) => {
    // Connect to Socket.io
    app.on('connection', function (socket) {
        // Create function to send status
        sendStatus = function (s) {
            socket.emit('status', s);
        };

        // Get chats from mongo collection
        data.find().limit(100).sort({ _id: 1 }).toArray(function (err, res) {
            if (err) {
                throw err;
            }

            // Emit the messages
            socket.emit('output', res);
        });

        // Handle input events
        socket.on('input', function (inputData) {
            const name = data.name;
            const message = data.message;

            // Check for name and message
            if (name === '' || message === '') {
                // Send error status
                sendStatus('Please enter a name and message');
            } else {
                // Insert message
                data.insert({ name: name, message: message }, function () {
                    app.emit('output', [data]);

                    // Send status object
                    sendStatus({
                        message: 'Message sent',
                        clear: true,
                    });
                });
            }
        });

        // Handle clear
        socket.on('clear', function (inputData) {
            // Remove all chats from collection
            data.remove({}, function () {
                // Emit cleared
                socket.emit('cleared');
            });
        });
    });
};

module.exports = { applyTo };
