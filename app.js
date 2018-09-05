var express = require('express')
var app = express()

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
	console.log('建立连接')

	socket.on('reqMessage', function (data) {
		console.log(data)


		// 模拟机器人聊天
		if(data==1){
			var msg = '您当前的花费有2元'
		}else if(data==2){
			var msg = '您当前的流量有20M'
		}else{
			var msg = '请输入正确的信息'
		}

		// 服务器给客户端发送数据
		socket.emit('resMessage', msg) // 机器人

		// io.emit()  群发-聊天室

	})
})