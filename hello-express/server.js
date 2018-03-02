var express = require('express');
var bodyParser = require('body-parser')
var fs = require('fs')
var multer  = require('multer')

// var upload = multer({ dest: 'uploads/' })

var createFolder = function(folder){
    try{
        fs.accessSync(folder)
    }catch(e){
        fs.mkdirSync(folder)
    }
};
var uploadFolder = './upload/';
createFolder(uploadFolder)

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadFolder)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) //保存文件名字
    }
  }) 
var upload = multer({ storage: storage })

var app = express(); // 创建一个实例
// app.use(bodyParser.urlencoded({ extended: false })); //使用一个中间件(下面的req.body属性), urlencoded不能得到解析json
app.use(bodyParser.json()) // 解析json
// app.set('views', './views')
app.set('view engine','ejs') // ejs模板设置,竟然没有require ejs =.=

// get是express自带的方法,类似还有 post delete
app.get('/',function(req,res){
    // send() 把信息返回到路由器,可以是字符串,也可以是json,对象,数组....
    var responseObject = {name:'Mike',age:22};
    res.send(responseObject); // 这里不需要用JSON.stringify(),express已经自动转换好了
});

// 路由参数 /:xxx
app.get('/profile/:id/user/:name',function(req,res){
    // console.dir(req.params); // 终端输出req的对象(刷新网页之后)
    // id,name 都是上面路径:id,:name对应的,调用 req.params属性
    res.send('this is a profile page:'+ req.params.id + ':' +req.params.name );
});
// 正则匹配 ? 代表前面的 字符(b)可以出现 0次或1次,所以路径 /abcd 或者 /acd 都可以访问
app.get('/ab?cd',function(req,res){
    res.send('ab?cd页面');
});
//  查询字符串
app.get('/sub/',function(req,res){
    console.dir(req.query)
    res.send('home page'+req.query.find); // find是url传过来 ?find=xxx 的find
});

// post请求====================================================
app.post('/',function(req,res){
    console.dir(req.body) // .body是 body-parser 的方法
    res.send(req.body.name)
})

// 上传文件==模板=================================================
app.get('/form/:name',function(req,res){
    /*var form = fs.readFileSync('form.html',{encoding:"utf8"})
    res.send(form)*/
    // express提供的api
    // res.sendFile(__dirname + '/form.html')
    var person = req.params.name;
    res.render('form', {person: person}); // 第一个person是html的person,第二个person是上面 req.params.name
})
app.get('/about',function(req,res){
    var data = ['jack','rose','mike']
    res.render('about',{data:data})
})
app.post('/upload', upload.single('logo'), function (req, res) {
    // console.dir(req.file) // 输出信息
    res.send({'ret_code':0})
})

app.listen(3000);
console.log('listening to port 3000')