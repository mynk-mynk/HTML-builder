const path = require('path');
const fs = require('fs');

const srcPath = path.join(__dirname, 'files');
const copyPath = path.join(__dirname, 'files-copy');


fs.mkdir(copyPath, { recursive: true }, (err) => {
    if (err) throw err;
});



fs.readdir(copyPath, (err, list) => {
    if (err) throw err;

    for (let item of list) {
        fs.unlink(path.join(copyPath, item), err => {
            if (err) throw err;
        })
    }
})


fs.readdir(srcPath, { withFileTypes: true }, (err, list) => {
    if (err) throw err;

    for (let item of list) {
        if (item.isFile()) {
            const newPath = (path.join(copyPath, item.name));
            fs.copyFile(path.join(srcPath, item.name), newPath, (err) => {
                if (err) throw 'File already exists';
            })
        }
    }
});


