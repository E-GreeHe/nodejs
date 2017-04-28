//var module = require("./module/module.js");
//console.log(module)
//引入http创建服务器
var http = require("http");
//引入url模块和querystring模块就是为解析路由的参数
var url = require("url");
var querystring = require("querystring")
//console.log(http)
//创建服务器
http.createServer(function(request,response){
	//$_GET[]/$_POST[]
	// /?name=ABC&title=ASD
	console.log("url:"+request.url)
	// name=ABC&title=ASD
	console.log(url.parse(request.url).query)
	
	var paramsStr = url.parse(request.url).query
	var params = querystring.parse(paramsStr);//$_["GET"]
	console.log("params:")
	console.log(params)
	
	//url.parse(string).query
	//改写头部，允许跨域
	response.setHeader('Access-Control-Allow-Origin','*');
	var obj = {
		name:'wscats',
		age:88
	}
	response.end(JSON.stringify(obj));
}).listen(12345)
//0~65536
console.log("开启服务器")
//module.obj.skill()
/*setInterval(function() {
	console.log(a);
	a++
}, 1000)*/