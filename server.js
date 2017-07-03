const express = require('express');
const bodyParser = require('body-parser');
const mongojs = require('mongojs');
const db = mongojs('todo', ['todos']);
const ObjectId = mongojs.ObjectId;
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get('/api', function(req, res) {
    console.log("contact");
    db.todos.find(function(err, docs) {
        if (err) {
            throw err
        };
        res.send(docs);
    })
});


app.post('/deleteTodo', function(req, res) {
    let id = req.body.id;
    db.todos.remove({
        _id: ObjectId(id)
    }, function(err, docs) {
        res.send(docs);
    })
})

app.post('/addNewTodo', function(req, res) {
    console.log('add new todos is contacted');
    let newTodo = req.body.newTodo;
    db.todos.insert({
        msg: newTodo
    }, function(err, docs) {
        res.send(docs);
    })
})

app.listen(3000, function() {
    console.log("Running on port 3000");
})