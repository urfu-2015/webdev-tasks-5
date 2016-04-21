/**
 * Created by Max on 20.04.2016.
 */
var lastID = 3;
var tasksList = {
    tasks: [
        { id: "1", text: "SAMPLE 1"},
        { id: "2", text: "SAMPLE 2"},
        { id: "3", text: "SAMPLE 3"}
    ]
};

exports.getTaskList = (req, res) => {
    res.status(200);
    res.json(tasksList);
};

function getIndexOfTaskWithId(taskId) {
    var tasks = tasksList.tasks;
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === taskId) {
            return i;
        }
    }
    return undefined;
}

exports.deleteTask = (req, res) => {
    var taskId = req.params.id;
    var index = getIndexOfTaskWithId(taskId);
    if (index || index === 0) {
        tasksList.tasks.splice(index, 1);
        res.status(200);
    } else {
        res.status(204);
    }
    res.send();
};

exports.changeTask = (req, res) => {
    var taskId = req.params.id;
    var index = getIndexOfTaskWithId(taskId);
    var newTask = { id: taskId, text: req.body.text };
    if (index || index === 0) {
        tasksList.tasks.splice(index, 1, newTask);
        res.status(200);
    } else {
        res.status(204);
    }
    res.send();
};

exports.createTask = (req, res) => {
    var text = req.body.text;
    lastID = lastID + 1;
    var newTask = { id: lastID.toString(), text };
    tasksList.tasks.push(newTask);
    res.status(201);
    res.json(lastID);
};