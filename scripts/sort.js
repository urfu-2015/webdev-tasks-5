module.exports = function (linkedList) {
    var sortedList = [];
    var index = 0;
    var previousItemId = null;

    while (sortedList.length < linkedList.length) {
        var current = linkedList[index];
        if (current.prev === previousItemId) {
            previousItemId = current._id;
            sortedList.push(current);
            index = 0;
        } else {
            index += 1;
        }
    }

    return sortedList.reverse();
};
