var tasksCollection; //на классы

function getAll() {
	return tasksCollection.find().sort({orderNum: 1}).toArray();
}

function add(task) {
	if (task.todo.length === 0) {
		return new Promise(
			resolve => resolve({})
		);
	}
	return tasksCollection.count()
	.then(num => {
		task.orderNum = num;
		return tasksCollection.insertOne(task);
	})
	.then(() => task);
}

function update(task) {
	if(task.todo.length === 0) {
		return remove(task);
	}
	var num = Number(task.orderNum);
	var taskDo = task.todo;
	return tasksCollection
	.update({orderNum: num}, {'$set': {todo: taskDo}})
	.then(update => task);
}

function remove(task) {
	var num = Number(task.orderNum);
	return tasksCollection
	.deleteMany({orderNum: num})
	.then(resolve => {
		return tasksCollection.updateMany(
			{orderNum: {'$gt': num}},
			{'$inc': {orderNum: -1}}
		);
	})
	.then(remove => ({}));	
}

function changeOrder(order) {
	var newNum = Number(order.newNum);
	var oldNum = Number(order.oldNum);
	var targetTask;
	return tasksCollection.find({orderNum: oldNum}).toArray()
	.then(tasks => {
		targetTask = tasks[0];
		targetTask.orderNum = newNum;
		return tasksCollection.remove({orderNum: oldNum});
	})
	.then(() => {
		if(newNum < oldNum) {
			return tasksCollection.updateMany(
			{'$and': [{orderNum: {'$gte': newNum}}, {orderNum: {'$lt': oldNum}}]},
			{'$inc': {orderNum: 1}})
		} else {
			return tasksCollection.updateMany(
			{'$and': [{orderNum: {'$gt': oldNum}}, {orderNum: {'$lte': newNum}}]},
			{'$inc': {orderNum: -1}})
		}
	})
	.then(() => tasksCollection.insertOne(targetTask))
}
	

const operations = {
	getAll: () => getAll(),
    add: newTask => add(newTask),
    remove: task => remove(task),
    update: task => update(task),
    changeOrder: order => changeOrder(order)
};

module.exports = db => {
    tasksCollection = db.collection('tasks');
    return operations;
};
