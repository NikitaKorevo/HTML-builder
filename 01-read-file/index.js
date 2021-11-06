const path = require('path');
const fs = require('fs');
const stdout = process.stdout;

const stream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
stream.on('data', partText => stdout.write(partText));