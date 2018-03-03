var express = require('express');
var todoController = require('./controllers/todoController.js')

var app = express();
todoController(app);

app.set('view engine','ejs');

app.use(express.static('./public'));

app.listen(3000);
console.log('listening to port 3000');