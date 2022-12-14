const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');
app.use(express.json());

const List = require('./database/models/list');
const Task = require('./database/models/task');

forgetful_phrases = ["i forgot","uhhhh","idk","help"]
getWord = () => {
    return forgetful_phrases[Math.floor(Math.random() * forgetful_phrases.length)];
}
const cron = require('node-cron');
cron.schedule('0 0 0 * * *' ,function(){
    console.log('running a task every day at 12:00am');
    all_tasks = Task.find({}).then((tasks) => {
        tasks.forEach((task) => {
            // random number between 0 and 1
            if (Math.random() < 0.5) {
                task.set({title: getWord()}).save();
            }
        });
    });
});

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods' , "GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE");
    res.header('Access-Control-Allow-Headers',"Origin, X-Requested-With, Content-Type, Accept");
    next();
})

/*lists/:listId*/

app.get('/lists', (req,res) => {
    List.find({})
        .then(lists => res.send(lists))
        .catch((error) => console.log(error));
});

app.post('/lists', (req,res) => {
    (new List({'title' : req.body.title}))
        .save()
        .then((list) => res.send(list))
        .catch((error) => console.log(error));
});

app.get('/lists/:listId', (req,res) =>{
    List.find({_id : req.params.listId})
    .then((list) => res.send(list))
    .catch((error) => console.log(error));
})

app.patch('/lists/:listId', (req,res) => {
    List.findOneAndUpdate({_id : req.params.listId}, {$set : req.body})
    .then((list) => res.send(list))
    .catch((error) => console.log(error));
})

app.delete('/lists/:listId', (req,res) => {
    const deleteTasks = (list) => {
        Task.deleteMany({_listId : list._id})
            .then(() => list)
            .catch((error) => console.log(error))
    };

    const list = List.findByIdAndDelete(req.params.listId)
        .then((list) => res.send(deleteTasks(list)))
        .catch((error) => console.log(error));
})

/* /lists/:listId/tasks/:taskId */

app.get('/lists/:listId/tasks/', (req,res) => {
    Task.find({_listId : req.params.listId})
        .then(lists => res.send(lists))
        .catch((error) => console.log(error));
});

app.post('/lists/:listId/tasks/', (req,res) => {
    (new Task({'title': req.body.title, '_listId':req.params.listId}))
    .save()
    .then((task) => res.send(task))
    .catch((error) => console.log(error));
});

app.get('/lists/:listId/tasks/:taskId', (req,res) =>{
    Task.find({_listId : req.params.listId, _id : req.params.taskId})
    .then((task) => res.send(task))
    .catch((error) => console.log(error));
});

app.patch('/lists/:listId/tasks/:taskId', (req,res) => {
    Task.findOneAndUpdate({_listId : req.params.listId, _id : req.params.taskId}, {$set : req.body})
    .then((task) => res.send(task))
    .catch((error) => console.log(error));
});

app.delete('/lists/:listId/tasks/:taskId', (req,res) => {
    Task.findOneAndDelete({_listId : req.params.listId, _id : req.params.taskId})
    .then((task) => res.send(task))
    .catch((error) => console.log(error));
})


app.listen(3000, () => console.log("Server Connected on port 3000"));