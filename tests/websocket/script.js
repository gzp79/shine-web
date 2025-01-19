const url = 'ws://localhost:3000/ws';
const socket = new WebSocket(url);

socket.addEventListener('open', function (_event) {
    socket.send('Hello Server!');
});

socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});

for (let i = 0; i < 10; ++i) {
    setTimeout(() => {
        console.log('Sending blob over websocket');
        socket.send('New message');
    }, 1000);
}
