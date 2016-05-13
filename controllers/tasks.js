/**
 * Created by Max on 20.04.2016.
 */
var lastID = 3;
var tasks = {
    1: "Buy a cat!",
    2: "Buy a dog!",
    3: "Buy a badger!"
};
//var tasks = [
//    { id: "1", text: "Buy a cat!"},
//    { id: "2", text: "Buy a dog!"},
//    { id: "3", text: "Buy a badger!"}
//];

exports.getTaskList = (req, res) => {
    res.status(200);
    res.json(tasks);
};

function getIndexOfTaskWithId(taskId) {
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === taskId) {
            return i;
        }
    }
}

exports.deleteTask = (req, res) => {
    var taskId = req.params.id;
    if (tasks.hasOwnProperty(taskId)) {
        delete tasks[taskId];
        res.status(200);
    } else {
        res.status(204);
    }
    res.send();
};

exports.changeTask = (req, res) => {
    var taskId = req.params.id;
    if (tasks.hasOwnProperty(taskId)) {
        tasks[taskId] = req.body.text;
        res.status(200);
    } else {
        res.status(204);
    }
    res.send();
};

exports.createTask = (req, res) => {
    var text = req.body.text;
    lastID = lastID + 1;
    tasks[lastID] = text;
    res.status(201);
    res.json(lastID);
};