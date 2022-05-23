const path = require('path');
const fs = require('fs');

const srcPath = path.join(__dirname, 'files');

fs.mkdir('./04-copy-directory/files-copy', { recursive: true }, (err) => {
    if (err) throw err;
});


fs.readdir(srcPath, { withFileTypes: true }, (err, list) => {
    if (err) throw err;

    for (let item of list) {
        if (item.isFile()) {
            const newPath = path.join(__dirname, 'files-copy', item.name);
            fs.copyFile(path.join(srcPath, item.name), newPath, (err) => {
                if (err) throw 'File already exists';
            })
        }
    }
});


