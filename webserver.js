const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => { //서버 생성
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n'); //웹브라우저가 전송받아 브라우저창에서 Hello World 출력
});

server.listen(port, hostname, () => { // 포트번호 리스닝, NodeJS로 웹서버를 만듬. IP. Port주소 리스닝
  console.log(`Server running at http://${hostname}:${port}/`);
});
