/* globals $ */

// $('#recent').on('click', (ev) => {
//     let btn = ev.target.closest('div[class^="thumbnail"]');
//     btn.hide();
// });

(function () {
    const element = function (id) {
        return document.getElementById(id);
    };
    // Get Elements
    const status = element('status');
    const messages = element('messages');
    const textarea = element('textarea');
    const username = element('username');
    const clearBtn = element('clear');
    // Set default status
    const statusDefault = status.textContent;
    const setStatus = function (s) {
        // Set status
        status.textContent = s;
        if (s !== statusDefault) {
            const delay = setTimeout(function () {
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
        socket.on('output', function (data) {
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
        socket.on('status', function (data) {
            // get message status
            setStatus((typeof data === 'object') ? data.message : data);
            // If status is clear, clear text
            if (data.clear) {
                textarea.value = '';
            }
        });
        // Handle Input
        textarea.addEventListener('keydown', function (event) {
            if (event.which === 13 && event.shiftKey === false) {
                // Emit to server input
                socket.emit('input', {
                    name: username.value,
                    message: textarea.value,
                });
                event.preventDefault();
            }
        });
        // Handle Chat Clear
        clearBtn.addEventListener('click', function () {
            socket.emit('clear');
        });
        // Clear Message
        socket.on('cleared', function () {
            messages.textContent = '';
        });
    }
}());
