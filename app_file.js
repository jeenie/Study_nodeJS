var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var _storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: _storage });
var fs = require('fs');
var mysql = require('mysql');
var conn = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'wldus1818',
  database : 'o2'
});

conn.connect();
var app = express();
app.set('views', './views_mysql');
app.set('view engine', 'pug');
app.locals.pretty = true;
//post 방식으로 들어온 데이터 사용할 때 필요한 모듈
app.use(bodyParser.urlencoded({ extended : false }));
//정적인 파일
app.use('/user', express.static('uploads'));

//router
//file upload
app.get('/upload', function(req, res){
  res.render('upload');
});
app.post('/upload', upload.single('userfile'), function(req, res){
  console.log(req.file);
  res.send('Uploaded : ' + req.file.filename);
});

app.get('/topic/new', function(req, res){
  fs.readdir('data', function(err, files){
    //err처리
    if(err) {
      console.log(err);
      res.statux(500).send('Internal Server Error');
    }
    res.render('new', {topics:files});
  });
});

//app application(write-save)
app.get(['/topic', '/topic/:id'], function(req, res) {
  //Implement a list of posts
  var sql = 'SELECT id, title FROM topic';
  conn.query(sql, function(err, topics, fields){
    var id = req.params.id;
    //Implment a detailed contents
    if(id) {
      var sql = 'SELECT * FROM topic WHERE id = ?';
      conn.query(sql, [id], function(err, topic, fields) {
        if(err) {
          console.log(err);
          res.statux(500).send('Internal Server Error');
        } else {
          res.render('view', {topics : topics, topic : topic[0]});
        }
      });
    } else {
      res.render('view', {topics:topics});
    }

  });

});

//기능 : 사용자가 전송한 데이터를 서버에서 받아서
//      데이터의 제목을 파일명, 본문을 파일의 내용으로 해서 저장
app.post('/topic', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/' + title, description, function(err){
      if(err) { //만약 err가 있다
        console.log(err); //console에 에러 출력 -> 사용자에게 직접 브라우저에서 에러를 보여주지 x
        res.status(500).send('Internal Server Error');
        //에러가 발생해 위 코드의 send가 실행되면 그 다음 문장 실행 안함.
        //Success!  출력 안함, Internal Server Error 출력
      }
      res.redirect('/topic/' + title);
  });
});

app.listen(3000, function(){
  console.log('Connected, 3000 port!');
});
