//introduce fs module
//引入fs模块
var fs = require("fs")
//introduce compression module
//引入压缩模块
var zlib = require('zlib')
//create readerStream
//创建一个可读流
var readerStream = fs.createReadStream('./img/1.jpg');
//create writerStream
//创建一个可写流
var writerStream = fs.createWriteStream('./img/copy1.jpg');
//写入
readerStream.pipe(writerStream);
// chain Stream
//链式流
fs.createReadStream('./img/1.jpg')
.pipe(zlib.createGzip())
.pipe(fs.createWriteStream('./img/copy2.jpg.zip'));

//write a video in './video/12.avi'
//fs.readFile('./video/1.avi', function(err, data) {
//	console.log(data)
//	fs.writeFile("./video/12.avi", data, function(err, data) {
//		console.log("write success")
//	})
//})