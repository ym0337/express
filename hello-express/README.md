## npm install express --save
## npm install nodemon -g
- node环境的调试工具,比node方便.启动服务 nodemon server.js
## npm install body-parser --save
- 处理表达的中间件
## 使用 postman 模拟 post 请求
## npm install multer --save
- Express默认并不处理HTTP请求体中的数据，对于普通请求体(JSON、二进制、字符串)数据，可以使用body-parser中间件。而文件上传(multipart/form-data请求)，可以基于请求流处理，也可以使用formidable模块或Multer中间件。
## npm install ejs --save
- 模板引擎,用来给页面添加动态数据
- 参数一般用 <%= params%>
- 表达式 <% %> <% %>
- 引入部分模板 <%- include('路径/文件.ejs') -%>
## 使用中间件
- app.use(function(req,res,next){
    ...
    next()
})

## 网上免费的Mongodb数据库网站,有500mb的空间, mlab.com 
## Mongoose库来连接 Mongodb数据库
- npm install mongoose --save
- var mongoose = require('mongoose');
- mongoose.connect('mongodb://ym0337:654321asd@ds255258.mlab.com:55258/todos2018');
- var todoSchema = new mongoose.Schema({
    item: String // 定义item是 String 类型
});
- var Todo = mongoose.model('Todo',todoSchema);