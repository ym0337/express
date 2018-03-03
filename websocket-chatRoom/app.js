var ws = require('nodejs-websocket');

var server = ws.createServer(function(conn){ 
    // conn 表示连进来的链接
    console.log('new connection')
    conn.on('text',function(str){ // 'text'是一个固定方法,接受客户端 ws.send() 过来的字符串内容
        console.log(str);
        // sendText 给客户端推送消息
        // conn.sendText(str)
        boardcast(str);
    });

    conn.on('error',function(err){ // 防止关闭页面崩溃
        console.log(err)
    });

}).listen(2233);
console.log('listening to port 2233')
// console.log(server.connections)

// 广播
function boardcast(str){
    // connections 是一个数组,包含所有连接的内容
    server.connections.forEach((conn)=>{
        conn.sendText(str)
    });
}