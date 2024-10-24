const AbstractFileItemFactory = require("./abstract_file_item_factory");
const File = require("./file");

class FileFactory extends AbstractFileItemFactory {
    /*
        @params name (string)
    */
    createFileItem(name) {
        return new File(name);
    }
}

module.exports = FileFactory;
