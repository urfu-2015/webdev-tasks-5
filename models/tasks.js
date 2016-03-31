var tasksCollection;

function getAll() {
	return tasksCollection.find().sort({orderNum: 1}).toArray();
}

function add(task) {
	if (task.todo.length === 0) {
		return new Promise(
			resolve => resolve({})
		);
	}
	return tasksCollection.count().then(
		num => {
			task.orderNum = num;
			return tasksCollection.insertOne(task);
		},
		error => {
			return error;
		}).then(() => task);
}

function update(task) {
	if(task.todo.length === 0) {
		return deletet(task);
	}
	console.log(task);
	var num = Number(task.orderNum);
	var taskDo = task.todo;
	return tasksCollection.update(
		{orderNum: num},
   		{'$set': {todo: taskDo}}
	).then(
		update => {
			console.log(update.result);
			return task;
		},
		error => error
	);
}

function deletet(task) {
	var num = Number(task.orderNum);
	return tasksCollection.deleteMany(
		{orderNum: num}
	).then(
		resolve => {
			return tasksCollection.updateMany(
				{orderNum: {'$gt': num}},
				{'$inc': {orderNum: -1}}
			);
		},
		error => error
	).then(
		remove => ({}),
		error => error
	);	
}

const operations = {
	getAll: () => getAll(),
    add: newTask => add(newTask),
    deletet: task => deletet(task),
    update: task => update(task)
};

module.exports = db => {
    tasksCollection = db.collection('tasks');
    return operations;
};
