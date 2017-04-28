//filestream
var fs = require("fs");
//console.log(fs)
//asynchronous readFile
//异步读取
/*fs.readFile("test.txt", function(err, data) {
	console.log(data.toString())
})*/
//synchronization readFile
//同步读取
var data = fs.readFileSync("ajax.html");
console.log(data.toString())
console.log("end")