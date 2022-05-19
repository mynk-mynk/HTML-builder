const fs = require('fs');
const path = require('path');

fs.writeFile(
    path.join(__dirname, 'text.txt'), '',
    (err) => {
        if (err) throw err;
    });

const { stdin, stdout } = process;

stdout.write('Hi! Write something:\n');
stdin.on('data', data => {
    let input = data.toString().trim();
    if (input !== 'exit') {
        fs.appendFile(
            path.join(__dirname, 'text.txt'),
            data,
            err => {
                if (err) throw err;
            }
        );
    } else {
        process.exit();
    }
});

process.on('exit', () => console.log('Bye bye!'));
process.on('SIGINT', () => process.exit());