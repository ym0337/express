var ws = require('nodejs-websocket');

var server = ws.createServer(function(conn){ 
    conn.on('text',function(str){
        var data = JSON.parse(str);
        switch(data.type){
            case "setname":
                conn.nicoName = data.name;
                boardcast(JSON.stringify({
                    info:conn.nicoName + ' 加入房间',
                    peopleNum:server.connections.length,
                    type:'info'
                }));
            break;
            case "chat":
                boardcast(JSON.stringify({
                    name:conn.nicoName,
                    peopleNum:server.connections.length,
                    text:data.text,
                    style:'text_right',
                    type:'chat'
                }));
            break;
            default:
            break;
        }
    });

    conn.on('close',function(){
        boardcast(JSON.stringify({
            leaveInfo:conn.nicoName + ' 离开了房间',
            peopleNum:server.connections.length,
            type:'leave'
        }))
    });

    conn.on('error',function(err){ // 防止关闭页面崩溃
        console.log(err)
    });

}).listen(2333);
console.log('listening to port 2333')

// 广播
function boardcast(str){
    // console.log(server.connections.length);
    server.connections.forEach((conn)=>{
        conn.sendText(str)
    });
}   