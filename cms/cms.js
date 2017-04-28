//引入http创建服务器
var http = require("http");
//引入url模块  querystring模块(解析路由的参数)
var url = require("url");
var querystring = require("querystring");

//引入数据库
var mysql = require("mysql");
//创建数据库链接
var connection = mysql.createConnection({
		//主机名
		host:"localhost",
		//用户名
		user:"root",
		//密码
		password:"",
		//要连接的数据库
		database:"newlist"
	})
//连接数据库
//connection.connect();

//创建服务器
http.createServer(function(request,response){
	//设置请求头 允许跨域
	response.setHeader('Access-Control-Allow-Origin', '*');
	//将url字符串转换成对象并返回
	console.log("url:" + request.url)
	var pramsStr = url.parse(request.url).query;
	var params = querystring.parse(pramsStr);
	//获取urlhash值
	var pathname = url.parse(request.url).pathname;
	console.log(params)
	switch(pathname){
		//增加新闻
		case "/add":
			//插入字段
			connection.query("insert into news (title,text,channel) values ('" + params.title + "','" + params.texts + "','" + params.channel + "')",function(err,data){

				if(err){
					//抛出错误
					throw err;
				}else{
					//连接数据库 查询返回数据库信息
					connection.query("select * from news",function(err,data){
						if(err){
							throw err;
						}else{
							var newlist = {}
							newlist.news = data;
							response.end(JSON.stringify(newlist));
						}
					})
				}
			})
			break;
		//查询数据库
		case "/search":
			connection.query("select * from news",function(err,data){
				if(err){
					throw err
				}else{
					console.log(data)
					var newlist = {}
					newlist.news = data;
					response.end(JSON.stringify(newlist));
				}
			})
			break;
		//删除
		case "/delete":
			connection.query("delete from news where id = " + params.id, function(err, data){
				if(err){
					throw err;
				}else{
					connection.query("select * from news",function(err,data){
						if(err){
							throw err;
						}else{
							var newlist = {}
							newlist.news = data;
							response.end(JSON.stringify(newlist));
						}
					});
				}
			});
			break;
		//修改详情页
		case "/revisedetail":
			connection.query("select * from news where id = " + params.id, function(err, data) {
				if(err) {
					throw err
				} else {
					var newlist = {}
					newlist.news = data;
					response.end(JSON.stringify(newlist));
				}
			})
			break;
		//修改
		case "/revise":
			connection.query("update news set text='" + params.texts + "',title='" + params.title + "' where id =" + params.id, function(err, data) {
				if(err) {
					throw err
				} else {
					var news = {};
					news.newlists = data;
					response.end(JSON.stringify(news));
				}
			})
			break;
	}
}).listen(12346)

console.log('连接成功')
