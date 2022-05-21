const path = require('path');
const fs = require('fs');

const pathToStyles = path.join(__dirname, 'styles');
const pathToDist = path.join(__dirname, 'project-dist');
let styles = [];

fs.readdir(pathToStyles, (err, list) => {
    if (err) throw err;

    list.forEach(item => {
        let newPath = path.join(pathToStyles, item);
        const ext = path.extname(newPath);

        if (ext === '.css') {

            fs.readFile(newPath, 'utf-8', (err, data) => {
                if (err) throw err;

                styles.push(data);

                if (styles.length !== 0) {

                    fs.writeFile(path.join(pathToDist, 'bundle.css'), styles.join('\n'), (err) => {
                        if (err) throw err;
                    });

                } else {
                    console.log('CSS files weren\'t found');
                }
            });
        }
    })
})


