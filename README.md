## FileSystemManager - A File Management System in JavaScript

This project provides a simple file management system implemented in JavaScript. It allows you to create and manage folders and files within a hierarchical structure.

### Features

* Create folders and files
* List folder contents
* Move files and folders
* Search for files by exact name or pattern
* View the directory structure

### Usage

This library requires the following files:

* `models/folder.js` - Defines the `Folder` class representing a folder in the file system.
* `models/file.js` - Defines the `File` class representing a file in the file system.
* `functions/level_order_traversal.js` - Implements a level-order traversal algorithm for navigating the file system.
* `models/file_item_factory.js` - Provides a factory for creating `Folder` or `File` objects.
* `models/folder_factory.js` - Creates `Folder` objects.
* `models/file_factory.js` - Creates `File` objects.

**1. Installation**

You can use this library as a standalone module or integrate it into your project.


**2. Creating a FileSystemManager instance**

```javascript
const FileSystemManager = require('./FileSystemManager');

const fsManager = new FileSystemManager('root'); // Name of the root folder
```

## Functions

The `FileSystemManager` class provides several functions for managing the file system:

* **`makeNewFileItem(name, isFolder)`:** Creates a new `Folder` or `File` object based on the `isFolder` flag.
* **`getNamesFromFsItemsList(fsItemsList)`:** Extracts a list of names from an array of `Folder` or `File` objects.
* **`getChildFromFolder(parentFolder, childName)`:** Gets a child folder or file object by name from a parent folder.
* **`childExistsInFolder(parentFolderName, childName)`:** Checks if a child folder or file exists within a parent folder by name.
* **`folderNameExists(folderName)`:** Checks if a folder exists by name.
* **`listContents(folderName)`:** Lists the names of files and folders within a folder.
* **`addFileOrFolder(parentFolderName, name, isFolder)`:** Adds a new folder or file to a parent folder.
* **`deleteFileOrFolder(parentFolderName, name)`:** Deletes a folder or file from a parent folder.
* **`moveFileOrFolder(sourceName, destinationFolderName)`:** Moves a folder or file to a new location.
* **`listDirectoryStructure()`:** Retrieves a string representation of the directory structure.
* **`searchFileExactMatch(folderName, fileName)`:** Searches for a file with an exact name within a folder.
* **`searchFileLikeMatch(folderName, pattern)`:** Searches for files whose names contain a specific pattern within a folder.

**Note:** All functions involving folder names are case-sensitive.

## Example Usage

```javascript
// Create a new folder
fsManager.addFileOrFolder('root', 'documents', true);

// Create a new file
fsManager.addFileOrFolder('documents', 'report.txt', false);

// List contents of the 'documents' folder
console.log(fsManager.listContents('documents'));

// Move the 'report.txt' file to a new folder 'data'
fsManager.addFileOrFolder('root', 'data', true);
fsManager.moveFileOrFolder('report.txt', 'data');

// Search for files with 'report' in their names
console.log(fsManager.searchFileLikeMatch('root', 'report'));

// Get the directory structure
console.log(fsManager.listDirectoryStructure());
```
