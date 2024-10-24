const { FileSystemItem } = require("./file_system_item");

class Folder extends FileSystemItem {
    /*
        @param name (string)
    */
    constructor(name) {
        super(name, true);
        this.items = [];
    }

    /*
        @param fsItem (file_system_item)
    */
    addItem(fsItem) {
        if (!fsItem.name) {
            return;
        }
        this.items.push(fsItem);
    }

    /*
        @param fsItem (file_system_item)
    */
    removeItem(fsItem) {
        if (!fsItem.name) {
            return;
        }
        this.items = this.items.filter((item) => {
            return item.name !== fsItem.name;
        });
        console.log(this.items);
    }

    /*
        @param name (string)
    */
    getItem(name) {
        for (fsItem of this.items) {
            if (fsItem.name === name) {
                return fsItem;
            }
        }
        return null;
    }
}

module.exports = Folder;
