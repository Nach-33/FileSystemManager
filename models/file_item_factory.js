class FileItemFactory {
    /*
        @params name (string)
    */
    getFileItem(factory, name) {
        return factory.createFileItem(name);
    }
}

module.exports = FileItemFactory;
