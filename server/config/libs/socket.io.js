/* globals sendStatus */

const applyTo = (io, data) => {
    // Connect to Socket.io
    io.on('connection', (socket) => {
        const chat = data.sockets.initCollection();

        // Create function to send status
        // eslint-disable-next-line
        sendStatus = (s) => {
            socket.emit('status', s);
        };

        // Get chats from mongo collection
        chat.find().limit(20).sort({ _id: 1 }).toArray((err, res) => {
            if (err) {
                throw err;
            }

            // Emit the messages
            socket.emit('output', res);
        });

        // Handle input events
        socket.on('input', (input) => {
            const name = input.name;
            const message = input.message;

            // Check for name and message
            if (name === '' || message === '') {
                // Send error status
                sendStatus('Please enter a name and message');
            } else {
                // Insert message
                chat.insert({ name: name, message: message }, () => {
                    io.emit('output', [input]);

                    // Send status object
                    sendStatus({
                        message: 'Message sent',
                        clear: true,
                    });
                });
            }
        });

        // Handle clear
        socket.on('clear', (input) => {
            // Remove all chats from collection
            chat.remove({}, () => {
                // Emit cleared
                socket.emit('cleared');
            });
        });
    });
};

module.exports = { applyTo };
