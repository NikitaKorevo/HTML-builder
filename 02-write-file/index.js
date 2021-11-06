const path = require('path');
const fs = require('fs');
const {stdout, stdin} = require('process');
const readline = require('readline');
let writeText = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('Hello, enter text\n');

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});

rl.on('line', (input) => {
  if (input === 'exit') process.exit();
  writeText.write(input + '\n');
});

const shutdown = () => {
  stdout.write('Goodbue!');
  process.exit();
};
process.on('exit', () => shutdown());