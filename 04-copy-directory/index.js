const path = require('path');
const fs = require('fs');
const { readdir, rm, mkdir, copyFile } = fs.promises;

const copyDirectory = async () => {
  try {
    const result = await readdir(path.join(__dirname, 'files'), 'utf-8');
    const thereFolderFilesCopy = (await readdir(path.join(__dirname), 'utf-8')).includes('files-copy');
    if (thereFolderFilesCopy) await rm(path.join(__dirname, 'files-copy'), { recursive: true });
    await mkdir(path.join(__dirname, 'files-copy'));
    await result.forEach(file => {
      copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file));
    });
  } catch (err) {
    throw new err;
  }
};
copyDirectory();
