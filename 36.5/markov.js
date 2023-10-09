/** Text-based markov chain generator */

class MarkovMachine {

  /** Create a markov machine and parse the provided text. */

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(word => word !== "");
    this.createChains();
  }

  /** Create markov chains:
   *
   *  For example, for the text "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  createChains() {
    let chains = new Map();

    for (let i = 0; i < this.words.length; i += 1) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (chains.has(word)) chains.get(word).push(nextWord);
      else chains.set(word, [nextWord]);
    }

    this.chains = chains;
  }

  /** Select a random item from an array */

  static chooseRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /** Generate random text based on the markov chains */

  generateText(numWords = 100) {
    // Start with a random key
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.chooseRandom(keys);
    let output = [];

    // Produce markov chain until reaching a termination word
    while (output.length < numWords && key !== null) {
      output.push(key);
      key = MarkovMachine.chooseRandom(this.chains.get(key));
    }

    return output.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};
