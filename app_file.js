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
var upload = multer({ storage: _storage }); //dest(목적지) : 업로드한 파일을 저장할 디렉토리명
var fs = require('fs'); //파일 시스템을 제어할 수 있는 기본 모듈을 가져옴
var app = express();
app.set('views', './views_file');
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
  // 중복으로 사용되는 코드
  fs.readdir('data', function(err, files){
    //err처리
    if(err) {
      console.log(err);
      res.statux(500).send('Internal Server Error');
    }
    var id = req.params.id;
    if(id){
      //id값이 있을 때
      fs.readFile('data/'+ id, 'utf8', function(err, data){
        if(err) {
          console.log(err);
          res.statux(500).send('Internal Server Error');
        }
        res.render('view', {topics:files, title:id, description:data});
      });
    } else {
      //id값이 없을때
      res.render('view', { topics:files, title:'Welcome', description:'Hello, JavaScript for server.' });
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
