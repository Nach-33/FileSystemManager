class FileSystemItem {
    /*
        @param name (string)
    */
    constructor(name, isFolder) {
        this.name = name;
        this.isFolder = isFolder;
    }
}

module.exports.FileSystemItem = FileSystemItem;
