var express = require('express');
var app = express(); // 이 두줄은 그냥 express 사용하기 위해 필수로 적는거
var pug = require('pug');
app.locals.pretty = true;
app.set('view engin', 'pug'); //express와 jade를 연결하는 코드
app.set('views', './views');
app.use(express.static('public')); //정적인 파일이 위치할 디렉토리를 지정하는 기능
app.get('/template', function(req, res){
  res.render('temp', {time:Date(), title:'Pug'});
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
