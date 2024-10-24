const { FileSystemItem } = require("./file_system_item");

class File extends FileSystemItem {
    /*
        @param name (string)
    */
    constructor(name) {
        super(name, false);
    }
}

module.exports = File;
