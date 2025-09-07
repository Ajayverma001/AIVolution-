// server/server.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

const users = new Map();
const rooms = new Map();

app.get('/rooms/:room/messages', (req, res) => {
  const room = req.params.room || 'global';
  const msgs = rooms.get(room) || [];
  res.json(msgs);
});

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);

  socket.on('join', ({ username, room = 'global' }) => {
    users.set(socket.id, { username, room });
    socket.join(room);

    socket.to(room).emit('user-joined', { socketId: socket.id, username });

    const online = [];
    for (const [id, info] of users.entries()) {
      if (info.room === room) online.push({ socketId: id, username: info.username });
    }
    io.to(room).emit('online-users', online);

    const msgs = rooms.get(room) || [];
    socket.emit('room-messages', msgs);
  });

  socket.on('send-message', ({ room = 'global', text }) => {
    const sender = users.get(socket.id);
    if (!sender) return;
    const message = { id: Date.now(), text, username: sender.username, createdAt: new Date().toISOString() };

    const arr = rooms.get(room) || [];
    arr.push(message);
    rooms.set(room, arr.slice(-200));

    io.to(room).emit('new-message', message);
  });

  socket.on('typing', ({ room = 'global', typing }) => {
    const sender = users.get(socket.id);
    if (!sender) return;
    socket.to(room).emit('user-typing', { socketId: socket.id, username: sender.username, typing });
  });

  socket.on('disconnect', () => {
    const left = users.get(socket.id);
    if (left) {
      const { room, username } = left;
      users.delete(socket.id);
      socket.to(room).emit('user-left', { socketId: socket.id, username });

      const online = [];
      for (const [id, info] of users.entries()) {
        if (info.room === room) online.push({ socketId: id, username: info.username });
      }
      io.to(room).emit('online-users', online);
    }
    console.log('socket disconnected', socket.id);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
