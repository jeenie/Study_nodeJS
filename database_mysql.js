var mysql = require('mysql');
//이렇게 깃에 올리거나 공유하면 절대 안됨, 중요한 정보를 노출(secret 대체)
var conn = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'wldus1818',
  database : 'o2'
});

conn.connect();
/* select명령
var sql = 'SELECT * FROM topic';
conn.query(sql, function(err, rows, fields) {
  if(err) {
    console.log(err);
  } else {
    for(var i = 0; i<rows.length; i++){
      console.log(rows[i].title);
    }
  }
});
*/
/* insert 명령
// ? : 치환자 , sql injection 공격으로 부터 보호
var sql = 'INSERT INTO topic (title, description, author) VALUES(?, ?, ?)';
var params = ['Supervisor', 'Watcher', 'graphitte'];
conn.query(sql, params, function(err, rows, fields) {
  if(err){
    console.log(err);
  } else {
    //이때에 rows의 내용은 삽입된 데이터의 수와 id값과 같은 것들이 있다.
    console.log(rows.insertId);
  }
});
*/
/* update 명령
var sql = 'UPDATE topic SET title=?, author=? WHERE id=?';
var params = ['NPM', 'leezche', 2];
conn.query(sql, params, function(err, rows, fields) {
  if(err){
    console.log(err);
  } else {
    //이때에 rows의 내용은 삽입된 데이터의 수와 id값과 같은 것들이 있다.
    console.log(rows);
  }
});
*/
var sql = 'DELETE FROM topic WHERE id=?';
var params = [5];
conn.query(sql, params, function(err, rows, fields) {
  if(err){
    console.log(err);
  } else {
    //이때에 rows의 내용은 삽입된 데이터의 수와 id값과 같은 것들이 있다.
    console.log(rows);
  }
});
conn.end();
