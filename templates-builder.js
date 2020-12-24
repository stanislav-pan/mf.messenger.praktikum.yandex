const FileHound = require('filehound');
const fs = require('fs');

const files = FileHound.create()
  .paths(__dirname + '/src/client/app')
  .ext('njk')
  .find();

files.then((filePaths) => {
  filePaths.forEach((filePath, index) => {
    const arr = filePath.split('\\');

    const name = arr[arr.length - 1];
    const dest = `${__dirname}/dist/static/templates/${name}`;

    fs.copyFileSync(filePath, dest);
  });
});
