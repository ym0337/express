// 表单中间件
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var mongoose = require('mongoose');
mongoose.connect('mongodb://ym0337:654321asd@ds255258.mlab.com:55258/todos2018');
var todoSchema = new mongoose.Schema({
    item: String // 定义item是 String 类型
});
var Todo = mongoose.model('Todo',todoSchema);
// var itemOne = Todo({item:'buy flowers'}).save(function(err){
//     if(err) throw err;
//     console.log('item saved');
// });

// var data = [
//     {item:'get milk'},
//     {item:'walk dog'},
//     {item:'kick some coding ass'}
// ];

module.exports = function(app){

    app.get('/todo',(req,res)=>{ 
        Todo.find({},function(err,data){ // {}默认从mongodb数据库中取出全部数据
            if(err) throw err;
            res.render('todo',{todos:data})
        });             
    });
    app.post('/todo',urlencodedParser,(req,res)=>{
        // data.push(req.body);
        // res.json(data); // 把数据存到内存中,只要重启服务就会不见了,这里的返回的json的内容无所谓
        var itemOne = Todo(req.body).save(function(err,data){
            if(err) throw err;
            res.json(data);
        });
    });
    app.delete('/todo/:item',(req,res)=>{
        /*data = data.filter((todo)=>{
            // .trim().replace(/ /g, "-") req.params.item 在 todo-list.js 处理了
            return todo.item.trim().replace(/ /g, "-") !== req.params.item
        });*/
        Todo.find({item:req.params.item.replace(/-/g, " ")}).remove(function(err,data){ // 这里replace(正则跟原来的刚好相反过来,因为要还原才能匹配删除)
            if(err) throw err;
            res.json(data);
        });
    });  
};