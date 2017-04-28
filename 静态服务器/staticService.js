//var module = require("./module/module.js");
//console.log(module)
//introduce http module
//引入http创建服务器
var http = require("http");
//introduce fs module
var fs = require("fs");
//introduce url module and introduce querystring module
//引入url模块和querystring模块就是为解析路由的参数
var url = require("url");
var querystring = require("querystring");
//创建服务器
//create Server
http.createServer(function(request,response){
	console.log(url.parse(request.url).pathname);
	var pathname = url.parse(request.url).pathname;
	var dir = "./www/";
	console.log(dir + pathname.substr(1));
	fs.readFile(dir + pathname.substr(1), function(err, data) {
		if(pathname == "/favicon.ico") {

		} else {
			console.log(data)
			response.end(data.toString())
		}
	})
})
console.log("server succee")
