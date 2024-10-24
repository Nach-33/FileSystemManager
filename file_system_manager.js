const Folder = require("./models/folder");
const File = require("./models/file");
const levelOrderTraversal = require("./functions/level_order_traversal");
const FileItemFactory = require("./models/file_item_factory");
const FolderFactory = require("./models/folder_factory");
const FileFactory = require("./models/file_factory");

class FileSystemManager {
    /*
        @param rootName (string)
    */
    constructor(rootName) {
        this.root = new Folder(rootName);
    }

    /*
        @params name (string)
        @params isFolder (boolean)
    */
    makeNewFileItem(name, isFolder) {
        const factory = new FileItemFactory();
        if (isFolder) {
            return factory.getFileItem(new FolderFactory(), name);
        } else {
            return factory.getFileItem(new FileFactory(), name);
        }
    }

    /*
        @params fsItemsList (Array)
    */
    getNamesFromFsItemsList(fsItemsList) {
        return fsItemsList.map((fsItem) => fsItem.name);
    }

    /*
        @params parentFolder (Folder)
        @params childName (string)
    */
    getChildFromFolder(parentFolder, childName) {
        const child = parentFolder.items.filter((fsItem) => {
            return fsItem.name === childName;
        });
        return child.length ? child[0] : null;
    }

    /*
        @params parentFolderName (Folder)
        @params childName (string)
    */
    childExistsInFolder(parentFolderName, childName) {
        return this.listContents(parentFolderName).includes(childName);
    }

    /*
        @params folderName (string)
    */
    folderNameExists(folderName) {
        let folderExists = false;

        levelOrderTraversal(
            this.root,
            (currentFsItem) => {
                if (currentFsItem.name === folderName) {
                    folderExists = true;
                }
            },
            (currentFsItem) => {
                currentFsItem.name === folderName;
            }
        );
        return folderExists;
    }

    /*
        @params folderName (string)
    */
    listContents(folderName) {
        let contentsList = [];
        levelOrderTraversal(
            this.root,
            (currentFsItem) => {
                if (currentFsItem.name === folderName) {
                    contentsList = this.getNamesFromFsItemsList(
                        currentFsItem.items
                    );
                }
            },
            (currentFsItem) => {
                return currentFsItem.name === folderName;
            }
        );

        return contentsList ? contentsList : [];
    }

    /*
        @param parentFolderName (string)
        @param name (string)
        @param isFolder (boolean)
    */
    addFileOrFolder(parentFolderName, name, isFolder) {
        if (this.childExistsInFolder(parentFolderName, name)) return;
        levelOrderTraversal(
            this.root,
            (currentFsItem) => {
                if (currentFsItem.name === parentFolderName) {
                    currentFsItem.addItem(this.makeNewFileItem(name, isFolder));
                }
            },
            (currentFsItem) => {
                return currentFsItem.name === parentFolderName;
            }
        );
    }

    /*
        @param parentFolderName (string)
        @param name (string)
        @param isFolder (boolean)
    */
    deleteFileOrFolder(parentFolderName, name) {
        if (!this.childExistsInFolder(parentFolderName, name)) {
            return;
        }
        levelOrderTraversal(
            this.root,
            (currentFsItem) => {
                if (currentFsItem.name === parentFolderName) {
                    const child = this.getChildFromFolder(currentFsItem, name);
                    currentFsItem.removeItem(child);
                }
            },
            (currentFsItem) => {
                return currentFsItem.name === parentFolderName;
            }
        );
    }

    /*
        @params sourceName (string)
        @params destinationFolderName (string)
    */
    moveFileOrFolder = (sourceName, destinationFolderName) => {
        if (
            !this.folderNameExists(destinationFolderName) ||
            this.childExistsInFolder(destinationFolderName, sourceName)
        )
            return;
        levelOrderTraversal(
            this.root,
            (currentFsItem) => {
                if (!currentFsItem.isFolder) return;
                const child = this.getChildFromFolder(
                    currentFsItem,
                    sourceName
                );
                if (child) {
                    currentFsItem.removeItem(child);
                    this.addFileOrFolder(
                        destinationFolderName,
                        child.name,
                        child.isFolder
                    );
                }
            },
            () => {}
        );
    };

    listDirectoryStructure = () => {
        let directoryStructure = "";

        levelOrderTraversal(
            this.root,
            (currentFsItem) => {
                if (currentFsItem.isFolder) directoryStructure += "  + ";
                else directoryStructure += "    - ";
                directoryStructure += currentFsItem.name;
            },
            () => {}
        );

        return directoryStructure;
    };

    /*
        @params folderName (string)
        @params fileName (string)
    */
    searchFileExactMatch = (folderName, fileName) => {
        let fileMatchFound = null,
            parentReached = false;

        levelOrderTraversal(
            this.root,
            (currentFsItem) => {
                if (currentFsItem.name === folderName) {
                    parentReached = true;
                }
                if (parentReached) {
                    if (this.listContents(folderName).includes(fileName))
                        fileMatchFound = fileName;
                }
            },
            () => {}
        );

        return fileMatchFound;
    };

    matchPattern(contentsList, pattern, fileMatchFound) {
        contentsList.forEach((fsItemName) => {
            const normalizedName = fsItemName.toLowerCase();
            pattern = pattern.toLowerCase();
            if (normalizedName.includes(pattern)) {
                fileMatchFound.push(fsItemName);
            }
        });
    }

    searchFileLikeMatch = (folderName, pattern) => {
        let fileMatchFound = [],
            parentReached = false;

        levelOrderTraversal(
            this.root,
            (currentFsItem) => {
                if (currentFsItem.name === folderName) {
                    parentReached = true;
                }
                if (parentReached && currentFsItem.isFolder) {
                    const contentsList = this.getNamesFromFsItemsList(
                        currentFsItem.items
                    );
                    this.matchPattern(contentsList, pattern, fileMatchFound);
                }
            },
            () => {}
        );

        return fileMatchFound;
    };
}

module.exports = FileSystemManager;
