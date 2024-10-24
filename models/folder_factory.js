const AbstractFileItemFactory = require("./abstract_file_item_factory");
const Folder = require("./folder");

class FolderFactory extends AbstractFileItemFactory {
    /*
        @params name (string)
    */
    createFileItem(name) {
        return new Folder(name);
    }
}

module.exports = FolderFactory;
