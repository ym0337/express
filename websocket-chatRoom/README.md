## nrm 可以管理 下载源
- npm i nrm -g
 - 查看 nrm ls
 - 使用 nrm use name

## websocket 实现 服务器全双工通讯
## npm install nodejs-websocket --save
- 客户端中 建立ws协议:var ws = new WebSocket('ws://localhost:2333')
- 原生websocket中,客户端 :ws.send(str),服务端: conn.sendText(str)