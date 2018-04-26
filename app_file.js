var express = require('express');
var app = express();
app.set('views', '.views_file');

//routing
app.get('/topic/new', function(req, res){
  res.send('Hi');
});
app.listen(3000, function(){
  console.log('Connected, 3000 port!');
});
