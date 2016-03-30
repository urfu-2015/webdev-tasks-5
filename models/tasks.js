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
		return new Promise(resolve => resolve({}));
	}
	var num = task.orderNum;
	return tasksCollection.update(
		{ orderNum: num },
   		{ $set: { "todo": task.todo} }
	).then(
		update => task,
		error => error
	);
}

const operations = {
	getAll: () => getAll(),
    add: newTask => add(newTask),
    delete: task => delete(task),
    update: task => update(task)
};

module.exports = db => {
    tasksCollection = db.collection('tasks');
    return operations;
};
