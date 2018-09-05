var express = require('express')
var app = express()

// 引入 db 库
var DB = require('./module/db')

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
		var msg = data.msg||'';  // 获取客户端的数据
		// 去服务器查询数据  查询article这个collection   第二个参数条件
		DB.find('article',{title:{$regex:new RegExp(msg)}},{'title':''},function (err, data) {
			socket.emit('resMessage', {
				result: data
			})
		})
	})
})