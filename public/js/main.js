/* globals $  io */

// $('#recent').on('click', (ev) => {
//     let btn = ev.target.closest('div[class^="thumbnail"]');
//     btn.hide();
// });

(function init() {
    const element = (id) => {
        return document.getElementById(id);
    };
    // Get Elements
    const status = element('status');
    const messages = element('messages');
    const textarea = element('textarea');
    const username = element('username');
    const clearBtn = element('clear');
    const sendBtn = element('send');

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
    const socket = io.connect('localhost:80');

    // Check for connection
    if (socket !== undefined) {
        console.log('Connected to socket...');

        // Handle Output
        socket.on('output', (data) => {
            // console.log(data);
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

            event.focus();
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
