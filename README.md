# my-chat-server

간단한 Socket.IO + Express + TypeScript 채팅 서버

## 📋 주요 기능
- HTTP 헬스체크 엔드포인트 (`GET /health`)
- REST API로 과거 메시지 조회 (`GET /api/messages`)
- Socket.IO를 통한 실시간 채팅 브로드캐스트
- TypeScript 기반 강력한 타입 검사

## 🚀 설치 및 실행

1. 저장소 클론  
   ```bash
   git clone <서버 레포 URL>
   cd my-chat-server
   ```

2. 의존성 설치  
   ```bash
   npm install
   ```

3. 개발 모드 실행  
   ```bash
   npm run dev
   ```
   - 포트: `http://localhost:4000`

4. (프로덕션) 빌드 & 실행  
   ```bash
   npm run build
   npm start
   ```

## ⚙️ 스크립트

| 명령어           | 설명                              |
| ---------------- | --------------------------------- |
| `npm run dev`    | ts-node-dev로 개발 서버 실행      |
| `npm run build`  | TypeScript 컴파일 (`dist/` 폴더) |
| `npm run start`  | 빌드된 JS 실행                    |

## 🔧 환경 변수

- (없음) 기본값으로 `http://localhost:4000` 으로 실행됩니다.
- 필요하다면 `.env` 파일을 만들어 포트를 지정하거나 CORS 도메인을 설정하세요.

## 🗂️ 폴더 구조
```
my-chat-server/
├─ src/
│  ├─ index.ts            # 서버 진입점
│  ├─ messages.store.ts   # (옵션) 메시지 저장 로직
│  └─ ...                 # 기타 모듈
├─ package.json
└─ tsconfig.json
```

## 💡 팁
- JWT 인증, 네임스페이스(Room) 기능 등은 `src/index.ts`에 미들웨어 혹은 `io.of('/room')` 추가
- Redis 어댑터(`socket.io-redis`)로 수평 확장 가능
- HTTPS + WSS 구성 시 SSL 인증서 적용
