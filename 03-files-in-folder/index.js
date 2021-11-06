const path = require('path');
const fs = require('fs');
const { stdout } = require('process');

fs.readdir(path.join(__dirname, 'secret-folder'), (err, files) => {
  if (err) throw err;
  const nameFiles = files;

  nameFiles.forEach(file => {
    fs.stat(path.join(__dirname, 'secret-folder', file), (err, stats) => {
      if (err) throw err;
      if (stats.isFile()) {
        const extname = path.extname(file).slice(1);
        const name = path.basename(file).slice(0, -(extname.length + 1));
        const size = stats.size;
        stdout.write(`${name} - ${extname} - ${size}b\n`);
      }
    });
  });
});