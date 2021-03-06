/* globals $  io */

// $('#recent').on('click', (ev) => {
//     let btn = ev.target.closest('div[class^="thumbnail"]');
//     btn.hide();
// });

(function init() {
    // Get Elements
    const status = document.getElementById('status');
    const messages = document.getElementById('messages');
    const textarea = document.getElementById('textarea');
    const username = document.getElementById('username');
    const clearBtn = document.getElementById('clear');
    const sendBtn = document.getElementById('send');

    // Set default status
    const statusDefault = status.textContent;
    const setStatus = (s) => {
        // Set status
        status.textContent = s;
        if (s !== statusDefault) {
            const delay = setTimeout(() => {
                setStatus(statusDefault);
            }, 4000);
        }
    };

    // Connect to socket.io
    const socket = io.connect('localhost:8080');

    // Check for connection
    if (socket !== undefined) {
        console.log('Connected to socket...');

        // Handle Output
        socket.on('output', (data) => {
            if (data.length) {
                for (let x = 0; x < data.length; x++) {
                    // Build out message div
                    const message = document.createElement('div');
                    message.setAttribute('class', 'chat-message');
                    message.textContent = data[x].name + ': ' + data[x].message;
                    messages.appendChild(message);
                    messages.insertBefore(message, messages.firstChild);
                }
            }
        });

        // Get Status From Server
        socket.on('status', (data) => {
            // get message status
            setStatus((typeof data === 'object') ? data.message : data);
            // If status is clear, clear text
            if (data.clear) {
                textarea.value = '';
            }
        });

        // Handle Input
        textarea.addEventListener('keydown', (event) => {
            if (event.which === 13 && event.shiftKey === false) {
                // Emit to server input
                socket.emit('input', {
                    name: username.value,
                    message: textarea.value,
                });
                event.preventDefault();
            }
        });
        sendBtn.addEventListener('click', (event) => {
            socket.emit('input', {
                name: username.value,
                message: textarea.value,
            });
        });

        // Handle Chat Clear
        clearBtn.addEventListener('click', () => {
            socket.emit('clear');
        });

        // Clear Message
        socket.on('cleared', () => {
            messages.textContent = '';
        });
    }
}());
