const http = require('http');
const { Server } = require('socket.io');


const server = http.createServer();
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});


io.on('connection', (socket) => {
    console.log('Novo cliente conectado');

    socket.on('message', (message) => {
        console.log(`Nova mensagem: ${message}`);
        io.emit('message', message);
    });
});

server.listen(3001, () => {
    console.log('Servidor Socket.io está rodando na porta 3001');
});
