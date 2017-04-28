//introduce http module
//引入http模块
var http = require("http");
//introduce mysql module
var mysql = require("mysql");
//introduce fs module
var fs = require("fs")
//create sql connection
var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "mapdepot"
})
connection.connect();
////introduce cheerio module
//引入cheerio 相当于jquey   是nodejs的jquey
var cheerio = require("cheerio");
function download(url,callback){
	http.get(url, function(res) {
		var data = "";
		res.on('data', function(chunk) {
			data += chunk;
		});
		res.on('end', function() {
			callback(data)
		});
	})
};
download("http://www.tupianzj.com/meinv/xiezhen/", function(data) {
	//console.log(data);
	//把html结构交给服务端的jq去处理
	var $ = cheerio.load(data);
	//console.log($("img"))
	var imgArr = [];
	$("img").each(function(index, ele) {
//		console.log($(ele))
//		console.log("名字", $(ele).attr("alt"));
//		console.log("路径", $(ele).attr("src"));
		//插入数据库
		connection.query("insert into babe (title,src) values ('" + $(ele).attr("alt") + "','" + $(ele).attr("src") + "')", function(err, data) {
			console.log(data)
		})
		imgArr.push($(ele).attr("src"))
	})
	connection.query("select * from news", function(err, data) {
			console.log(data)
		})
//	connection.query("insert into babe (title,src) values (1,2)", function(err, data) {
//			console.log(data)
//		})
//	downloadImg(imgArr)
});


//var i = 0;
//function downloadImg(imgArr) {
//	console.log(imgArr)
//	var writerStream = fs.createWriteStream('./img/' + i + '.jpg');
//	http.get(imgArr[i], function(res) {
////		var writerStream = fs.createWriteStream('./img/' + i + '.jpg');
//		res.pipe(writerStream)
//		if(i < imgArr.length) {
//			i++;
//			downloadImg(imgArr)
//		} else {
//			return;
//		}
//	})
//}










