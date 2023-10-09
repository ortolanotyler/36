const fs = require('fs');
const process = require('process');
const axios = require('axios');

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

/** Read and display the content of a web page at the specified URL. */

async function displayWebPage(url) {
  try {
    let response = await axios.get(url);
    console.log(response.data);
  } catch (err) {
    console.error(`An error occurred while fetching ${url}: ${err}`);
    process.exit(1);
  }
}

let filePath = process.argv[2];

if (filePath.slice(0, 4) === 'http') {
  displayWebPage(filePath);
} else {
  displayFileContent(filePath);
}
