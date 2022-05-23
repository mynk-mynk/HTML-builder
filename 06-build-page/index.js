const path = require('path');
const fs = require('fs');

const pathToTemplate = path.join(__dirname, 'template.html');
const pathToComponents = path.join(__dirname, 'components');
const pathToStyles = path.join(__dirname, 'styles');
const pathToAssets = path.join(__dirname, 'assets');
let pathToDist = '';
let pathToDistAssets = '';

let template;
let data = '';

const stream = fs.createReadStream(pathToTemplate, 'utf8');
stream.on('error', error => console.log('Error', error.message));
stream.on('data', chunk => data += chunk);


function copyDir(pathDir, pathDist) {
    let currentPath = pathDir;
    let currentDistPath = pathDist;

    fs.readdir(currentPath, { withFileTypes: true }, (err, list) => {
        if (err) throw err;
    
        for (let item of list) {

            if (item.isFile()) {
                fs.copyFile(path.join(currentPath, item.name),  path.join(currentDistPath, item.name), (err) => {
                    if (err) throw 'File already exists';
                });
                continue;
            }

            if (item.isDirectory()) {
                fs.mkdir(path.join(currentDistPath, item.name), { recursive: true }, (err) => {
                    if (err) throw err;
                })
                copyDir(path.join(pathDir, item.name), path.join(currentDistPath, item.name));
                continue;
            }

        }
    });
}


stream.on('end', () => {
    template = data;

    fs.readdir(pathToComponents, (err, list) => {
        if (err) throw err;

        fs.mkdir('./06-build-page/project-dist', { recursive: true }, (err) => {
            if (err) throw err;
            pathToDist = path.join(__dirname, 'project-dist');

            fs.mkdir(path.join(pathToDist, 'assets'), { recursive: true }, (err) => {
                if (err) throw err;
            })

            pathToDistAssets = path.join(pathToDist, 'assets');

            copyDir(pathToAssets, pathToDistAssets);
        })

        list.forEach(item => {
            let newPath = path.join(pathToComponents, item);
            const ext = path.extname(newPath);
            if (ext === '.html') {
                fs.readFile(newPath, (err, data) => {
                    if (err) throw err;
                    const re = new RegExp(`{{${item.slice(0, -5)}}}`);
                    template = template.replace(re, data.toString());
                    fs.writeFile(path.join(pathToDist, 'index.html'), template, (err) => {
                        if (err) throw err;
                    });
                })
            }
        })

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
                            fs.writeFile(path.join(pathToDist, 'style.css'), styles.join('\n'), (err) => {
                                if (err) throw err;
                            });

                        } else {
                            console.log('CSS files weren\'t found');
                        }
                    });
                }
            })
        })





    })
})










