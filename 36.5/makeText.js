/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

/** Create a Markov machine from text and generate text from it. */

function generateTextFromMarkov(text) {
  let mm = new markov.MarkovMachine(text);
  console.log(mm.generateText());
}

/** Read a file and generate text from it. */

function generateTextFromFile(path) {
  fs.readFile(path, "utf8", function callback(err, data) {
    if (err) {
      console.error(`Unable to read file: ${path}: ${err}`);
      process.exit(1);
    } else {
      generateTextFromMarkov(data);
    }
  });
}

/** Read a URL and generate text from it. */

async function generateTextFromURL(url) {
  let response;

  try {
    response = await axios.get(url);
  } catch (err) {
    console.error(`Unable to read URL: ${url}: ${err}`);
    process.exit(1);
  }

  generateTextFromMarkov(response.data);
}

/** Interpret command line arguments to decide what to do. */

let [method, path] = process.argv.slice(2);

if (method === "file") {
  generateTextFromFile(path);
} else if (method === "url") {
  generateTextFromURL(path);
} else {
  console.error(`Unknown method: ${method}`);
  process.exit(1);
}
