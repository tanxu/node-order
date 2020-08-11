var express = require('express')
var app = express()
var url = require('url')

// 第一步 初始化
var server = require('http').Server(app)
var io = require('socket.io')(server)


app.set('view engine','ejs')
app.use(express.static('public'))

app.get('/',function (req,res) {
	res.render('index')
})

app.get('/news',function (req,res) {
	res.send('news')
})



// 第二步 监听端口
server.listen(8000,'192.168.1.107') 

// 第三步 写socket的代码
io.on('connection', function (socket) {
	// console.log('建立连接', socket.request.url) // 获取客户端建立链接传入的值
	var roomId = url.parse(socket.request.url,true).query.roomid;  // 获取房间号
	// console.log(roomId)

	// 实现多房间广播
	socket.join(roomId) // 加入房间（分组）

	socket.on('addcart', function (data) {
		console.log(data);
		// 广播给指定房间号的用户

 		// 哪个房间发给我 我发给哪个房间    -> 广播给指定房间（分组内）的所有用户
		// io.to(roomId).emit('addcart', 'server addcart ok');  

		// 哪个房间发给我 我发给哪个房间    -> 广播给分组内不包括自己的其他所有用户
		socket.broadcast.to(roomId).emit('addcart', 'server addcart ok');
	})

})



/**
 * socket使用步骤(express)
 * 1、安装
 * $ npm install socket.io
 *
 * 2、引入
 * var server = require('http').Server(app)
 * var io = require('socket.io')(server)
 * 
 * 3、增加端口号和ip地址的监听   app.listen 改成 server.listen
 * server.listen(8000,'192.168.1.107')
 *
 * 4、使用socket.io的服务
 * socket.on
 * socket.emit
 * io.emit()
 *
 * 5、在客户端引入socket.io 并建立链接
 * var socket = io.connect('http://192.168.1.107:80000?roomid=1')
 *
 * */
