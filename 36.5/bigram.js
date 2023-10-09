/** Text-based markov chain generator using bigrams. */

class MarkovMachine {

  /** Create a markov machine and parse the provided text. */

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(word => word !== "");
    this.createChains();
  }

  /** Create markov chains using bigrams:
   *
   *  For example, for the text "the cat in the hat", chains will be
   *  {"the cat": ["in"], "cat in": ["the"], "in the": ["hat"], "the hat": [null]} */

  createChains() {
    let chains = new Map();

    for (let i = 0; i < this.words.length - 1; i += 1) {
      let bigram = this.words[i] + " " + this.words[i + 1];
      let nextWord = this.words[i + 2] || null;

      if (chains.has(bigram)) chains.get(bigram).push(nextWord);
      else chains.set(bigram, [nextWord]);
    }

    this.chains = chains;
  }

  /** Select a random item from an array */

  chooseRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /** Generate random text based on the markov chains */

  generateText(numWords = 100) {
    // Start with a random key
    let keys = Array.from(this.chains.keys());
    let key = this.chooseRandom(keys);
    let output = [];

    // Produce markov chain until reaching a termination word
    while (output.length <= numWords && key !== null) {
      let [w1, w2] = key.split(" ");
      output.push(w1);
      key = w2 + " " + this.chooseRandom(this.chains.get(key));
    }

    return output.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};
