const fs = require('fs');
const process = require('process');
const axios = require('axios');

/** Handle output: write to a file if provided, otherwise print. */

function handleOutputText(text, outputPath) {
  if (outputPath) {
    fs.writeFile(outputPath, text, 'utf8', function(err) {
      if (err) {
        console.error(`Failed to write to ${outputPath}: ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(text);
  }
}

/** Read and display the content of a file at the given path. */

function displayFileContent(filePath, outputPath) {
  fs.readFile(filePath, 'utf8', function(err, data) {
    if (err) {
      console.error(`An error occurred while reading ${filePath}: ${err}`);
      process.exit(1);
    } else {
      handleOutputText(data, outputPath);
    }
  });
}

/** Read and display the content of a web page at the specified URL. */

async function displayWebPage(url, outputPath) {
  try {
    let response = await axios.get(url);
    handleOutputText(response.data, outputPath);
  } catch (err) {
    console.error(`An error occurred while fetching ${url}: ${err}`);
    process.exit(1);
  }
}

let filePath;
let outputPath;

if (process.argv[2] === '--out') {
  outputPath = process.argv[3];
  filePath = process.argv[4];
} else {
  filePath = process.argv[2];
}

if (filePath.slice(0, 4) === 'http') {
  displayWebPage(filePath, outputPath);
} else {
  displayFileContent(filePath, outputPath);
}
