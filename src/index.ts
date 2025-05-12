// server/src/index.ts
import express from 'express';
import http from 'http';
import { Server as IOServer } from 'socket.io';

const app = express();
const httpServer = http.createServer(app);
const io = new IOServer(httpServer, { cors: { origin: '*' } });

app.use(express.json());  // JSON 바디 파싱

// 1) 메모리 메시지 저장소
const messages: { id: number; text: string; timestamp: string }[] = [];

// 2) REST: 채팅 히스토리 조회
app.get('/api/messages', (_req, res) => {
  res.json(messages);
});

// 3) REST: 메시지 추가 (옵션)

app.post('/api/messages', (req, res) => {
  const { text } = req.body;
  const msg = { id: messages.length, text, timestamp: new Date().toISOString() };
  messages.push(msg);
  io.emit('chat message', text);
  res.status(201).json(msg);
});


// 4) Socket.IO 연결
// server/src/index.ts (Socket.IO 부분)
io.on('connection', socket => {
  console.log(`🔌 클라이언트 연결: ${socket.id}`);

  socket.on('chat message', (text: string) => {
    // 메시지 저장 로직은 그대로
    const msg = { id: messages.length, text, timestamp: new Date().toISOString() };
    messages.push(msg);
    socket.broadcast.emit('chat message', text);
  });

  socket.on('disconnect', () => {
    console.log(`❌ 클라이언트 연결 해제: ${socket.id}`);
  });
});


// 5) 서버 실행
httpServer.listen(4000, () => {
  console.log('🚀 http://localhost:4000');
});
