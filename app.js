var express = require('express');
var app = express(); // 이 두줄은 그냥 express 사용하기 위해 필수로 적는거
var pug = require('pug');
var bodyParser = require('body-parser'); //body-parser모듈 추가
app.locals.pretty = true; //pug파일이 이쁘게 출력 (들여쓰기가 잘된 상태)
app.set('view engine', 'pug'); //express와 pug(jade)를 연결하는 코드
app.set('views', './views');
app.use(express.static('public')); //정적인 파일이 위치할 디렉토리를 지정하는 기능
app.use(bodyParser.urlencoded({extended: false}));
//bodyParser가 항상 대기중...,
//사용자 요청이 들어오면 bodyParser가 동작 -> 시용자가 post방식으로 전송한 데이터를 사용할 수 있도록 함.
//<<Get>>
app.get('/form', function(req, res){
  res.render('form');
});
app.get('/form_receiver', function(req, res){
  var title = req.query.title;
  var description = req.query.description;
  res.send(title + ', '+description);
});
//<<Post>>
app.post('/form_receiver', function(req, res){
  //req.body는 bodyParser를 require 하지 않으면 사용할  undefined 에러 발생
  var title = req.body.title;
  var description = req.body.description;
  res.send(title + ', '+description);
});
//<<Query String>>
app.get('/topic/:id', function(req, res){
  var topics = [
    'Javascript is ....',
    'Nodejs is ....',
    'Express is ....'
  ];
  var output = `
    <a href="/topic?id=0">JavaScript</a><br>
    <a href="/topic?id=1">Nodejs</a><br>
    <a href="/topic?id=2">Express</a><br>
    ${topics[req.params.id]}
  `//path명으로 들어올때 parms, url query string으로 들어올때는 query
  res.send(output);
});
app.get('/topic/:id/:mode', function(req, res){
  res.send(req.params.id + ', ' + req.params.mode);
})
app.get('/template', function(req, res){
  res.render('temp', {time:Date(), title:'Pug'}); //pug파일 내부의 변수를 pug외부에서 선언
});
app.get('/', function(req, res) {
  res.send('Hello home page');
}); //get방식과 post방식 중 get방식 채택, '/' home을 의미
app.get('/dynamic', function(req, res){
  var lis = '';
  for(var i=0; i<5; i++) {
    lis = lis + '<li>coding</li>'
  }
  var time = Date();
  var output = `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
        Hello, Dynamic!
        <ul>
          ${lis} <!--그냥 적으면 문자열로 읽기 때문에 {$}안에 변수를 적어줌-->
        </ul>
        ${time}
    </body>
  </html>`;
  res.send(output);
});
app.get('/route', function(req,res) {
  res.send('Hello Router, <img src="/temp.jpg">');
});
app.get('/login',function(req, res){
  res.send('Login please')
});
app.listen(3000, function(){ //파라미터 : 포트번호, callback함수
  console.log('Connected 3000 port!');
});
