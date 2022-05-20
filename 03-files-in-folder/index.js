const path = require('path');
const fs = require('fs');

const pathToSecretFolder = path.join(__dirname, 'secret-folder/');

fs.readdir(pathToSecretFolder, (err, list) => {
    if (err) throw err;
    list.forEach(item => {
        let newPath = path.join(pathToSecretFolder, item);
        fs.stat(newPath, (err, stat) => {
            if (err) throw err;
            if (stat.isFile()) {
                const name = path.parse(newPath).name;
                const ext = path.extname(newPath).slice(1); 
                console.log(name, '-', ext, '-', stat.size/1000, 'kb');
            }
        })
    })
    
});