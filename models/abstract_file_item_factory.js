class AbstractFileItemFactory {
    /*
        @params name (string)
    */
    createFileItem(name) {
        throw new Error("createFileItem method must be implemented");
    }
}

module.exports = AbstractFileItemFactory;
