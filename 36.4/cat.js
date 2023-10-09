const fs = require('fs');
const process = require('process');

/** Read and display the content of a file at the given path. */

function displayFileContent(filePath) {
  fs.readFile(filePath, 'utf8', function(err, data) {
    if (err) {
      console.error(`An error occurred while reading ${filePath}: ${err}`);
      process.exit(1);
    } else {
      console.log(data);
    }
  });
}

displayFileContent(process.argv[2]);
