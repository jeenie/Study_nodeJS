var mysql = require('mysql');
//이렇게 깃에 올리거나 공유하면 절대 안됨, 중요한 정보를 노출(secret 대체)
var conn = mysql.createConnection({
  host : 'localhost',
  user : 'secret',
  password : 'secret',
  database : 'o2'
});

conn.connect();
var sql = 'SELECT * FROM topic';
conn.query(sql, function(err, rows, fields) {
  if(err) {
    console.log(err);
  } else {
    console.log('rows', rows);
    console.log('fields', fields);
  }
});
conn.end();
