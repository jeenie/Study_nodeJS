var _  = require('underscore'); //underscore 모듈을 가져옴 사용할 수 잇는 객체 리턴
var arr = [3, 6, 9, 1, 12];
console.log(arr[0]);
console.log(_.first(arr));
console.log(arr[arr.length-1]);
console.log(_.last(arr));
