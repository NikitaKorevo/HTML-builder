const path = require('path');
const fs = require('fs');
const { readdir, mkdir, appendFile, rm, stat, copyFile, readFile, writeFile } = fs.promises;

const deleteProjectDist = async () => {
  await rm(path.join(__dirname, 'project-dist'), {recursive: true, force: true});
  mergeStyles();
  mergeAssets();
  editHTML();
};
deleteProjectDist();

const mergeStyles = async () => {
  try {
    const nameFilesCSS = await readdir(path.join(__dirname, 'styles'));
    await mkdir(path.join(__dirname, 'project-dist'));

    nameFilesCSS.forEach(file => {
      if (path.extname(file) === '.css') {
        const readFile = fs.createReadStream(path.join(__dirname, 'styles', file), 'utf-8');
        readFile.on('data', chunk => appendFile(path.join(__dirname, 'project-dist', 'style.css'), chunk));
      }
    });
  } catch (err) {
    throw new err;
  }
};

const mergeAssets = async () => {
  try {
    let src = path.join(__dirname, 'assets');
    let dest = path.join(__dirname, 'project-dist', 'assets');

    const searchFile = async (src, dest) => {
      const files = await readdir(src);

      for await (let file of files) {
        let isDirectory = (await stat(path.join(src, file))).isDirectory();
        if (isDirectory) {
          searchFile(path.join(src, file), path.join(dest, file));
        } else {
          await mkdir(path.join(dest), { recursive: true });
          await copyFile(path.join(src, file), path.join(dest, file));
        }
      }
    };
    searchFile(src, dest);
  } catch (err) {
    throw new err;
  }
};

const editHTML = async () => {
  try {
    let template = await readFile(path.join(__dirname, 'template.html'), {encoding: 'utf-8'});
    const arrComponents = template.match(/\{\{(.*?)\}\}/g);

    for await (const  component of arrComponents) {
      const nameForHTML = component.slice(2, -2).trim() + '.html';
      template = template.replace(component, await readFile(path.join(__dirname, 'components', nameForHTML)));
    }
    await writeFile(path.join(__dirname, 'project-dist', 'index.html'), template);
  } catch (err) {
    throw new err;
  }
};