//introduce fs module
//引入模块
var fs = require("fs");
/*
//Simple to read and write files
//简单读写文件
//读文件
fs.readFile("test.txt",function(err, data){
	console.log(data.toString())
})
//write files
//写入文件
fs.writeFile("test.txt","My name is E-Gree",function(err,data){
	console.log("write success")
})
fs.writeFileSync("test.txt","askdaskdh")
*/
var data = '';
//create ReadStream
//创建可读流
var readerStream = fs.createReadStream('txt/test.txt');
//handle Stream event
//处理流事件
readerStream.on('end',function(){
	console.log(data);
});

var data = 'My name is E-Gree';
// 创建一个可以写入的流，写入到文件 newTest.txt 中
var writerStream = fs.createWriteStream('txt/newTest.txt');
//set utf-8 of support the Chinese
//设置utf-8编码  支持中文
writerStream.write(data,'UTF8');
// 处理流事件 --> data, end, and error
//writer Stream
writerStream.on('finish', function() {
    console.log("写入完成。");
});


