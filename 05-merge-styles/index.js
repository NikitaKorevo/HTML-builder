const path = require('path');
const fs = require('fs');
const { readdir, appendFile, rm } = fs.promises;

const mergeStyles = async () => {
  try {
    const nameFiles = await readdir(path.join(__dirname, 'styles'), 'utf-8');
    const thereFileBundle = (await readdir(path.join(__dirname, 'project-dist'), 'utf-8')).includes('bundle.css');
    if (thereFileBundle) await rm(path.join(__dirname, 'project-dist', 'bundle.css'));

    nameFiles.forEach(file => {
      if (path.extname(file) === '.css') {
        const readFile = fs.createReadStream(path.join(__dirname, 'styles', file), 'utf-8');
        readFile.on('data', chunk => appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), chunk));
      }
    });
  } catch (err) {
    throw new err;
  }
};
mergeStyles();