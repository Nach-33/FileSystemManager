class Queue {
    constructor() {
        this.items = new Array();
        this.frontIndex = -1;
        this.backIndex = -1;
    }

    isEmpty() {
        return this.frontIndex === this.backIndex;
    }

    /*
        @param item (any)
    */
    push(item) {
        this.backIndex = this.backIndex + 1;
        this.items.push(item);
    }

    front() {
        if (this.isEmpty()) null;
        return this.items[this.frontIndex + 1];
    }

    pop() {
        if (this.isEmpty()) return;
        this.frontIndex = this.frontIndex + 1;
    }
}

module.exports.Queue = Queue;
