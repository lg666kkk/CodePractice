
console.log(__dirname);
console.log(__filename);

require('./b')

const fs = require('fs')
fs.readFile(__dirname +'/a.txt', function (err, data) {
  if (err) {
    throw err
  }
  //console.log(data);
})