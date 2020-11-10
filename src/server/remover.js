let fs = require('fs');
var path = require('path');

const pathToApp = path.resolve(__dirname, '../../dist/app');

function readdir(pathToDir) {
    const data = fs.readdirSync(pathToDir);

    data.forEach((item) => {
        const filePath = `${pathToDir}/${item}`;

        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            readdir(filePath);
        } else if (path.extname(filePath) === '.ts') {
            fs.unlinkSync(filePath);
        }
    });
}

readdir(pathToApp);
