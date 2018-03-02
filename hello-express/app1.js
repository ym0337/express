var express = require('express')

var app = express();
app.use(express.static('public')); //可以直接方法public里面的东西,例如:http://localhost:3000/amd.png 不需要 /public
app.use('/home',express.static('public')); //可以添加路由,访问时http://localhost:3000/home/amd.png

app.use(function(req,res,next){
    console.log('first middleware')
    next()// 只有这样才能继续跑下一个中间件
    console.log('first middleware after')
})

app.use(function(req,res,next){
    console.log('second middleware')
    // res.send('ok')
    next()
})
app.use(function(req,res,next){
    console.log('three middleware')
    res.send('ok2')
})

app.listen(3000)
console.log('listening to port 3000')