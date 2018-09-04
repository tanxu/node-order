var http = require('http')
var fs = require('fs')

var app = http.createServer(function (req, res) {
  fs.readFile('app.html', function (err, data) {
    res.writeHead(200, {'Content-Type': 'text-html;charset=utf-8'});
    res.end(data);
  })
})

app.listen(3000);


// 1 引入 socket.io
var io = require('socket.io')(app);

// 2 建立连接
io.on('connection', function (socket) {
  // socket.emit('news',{hello:'world'});
  // socket.on('my other event', function (data) {
  //   console.log(data,'服务器建立链接了')
  // })

  // 获取客户端广播的数据
  socket.on('addcart', function (data) {
    console.log(data)

    // 服务器给客户端发送数据
    // 第一种方式 -> socket.emit('')  谁给我发的我发给谁
    // 第二种方式 -> io.emit()  群发 给所有连接服务器的客户端都广播数据
    socket.emit('to-client', '服务端：我是服务器       ' + '客户端：' +data.client)
    // io.emit('to-client', '我是服务器的数据' + data)
  })
})

// 3 在客户端引入