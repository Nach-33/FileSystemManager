const { Queue } = require("../models/queue");

/*
    @param root (string)
    @param computeFunction (function)
    @param endTraversal (function)
*/
const levelOrderTraversal = (root, computeFunction, endTraversal) => {
    const orderQueue = new Queue();
    orderQueue.push(root);

    let visited = {};

    while (!orderQueue.isEmpty()) {
        const currentFsItem = orderQueue.front();
        orderQueue.pop();

        if (visited[currentFsItem.name]) continue;
        visited[currentFsItem.name] = 1;

        computeFunction(currentFsItem);

        if (endTraversal(currentFsItem)) return;

        if (!currentFsItem.isFolder) continue;

        for (const fsItem of currentFsItem.items) {
            orderQueue.push(fsItem);
        }
    }
};

module.exports = levelOrderTraversal;
