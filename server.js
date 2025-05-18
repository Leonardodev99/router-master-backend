import http from 'http';
import app from './app.js';
import setupSocket from './socketServer.js';

const port = 3005;

// Cria servidor HTTP baseado no Express
const server = http.createServer(app);

// Inicializa WebSocket
setupSocket(server);

// Escuta HTTP + WebSocket
server.listen(port, () => {
  console.log();
  console.log(`🚀 HTTP + WebSocket ativo em: http://localhost:${port}`);
});
