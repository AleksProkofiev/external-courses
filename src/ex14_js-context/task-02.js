function Hangman(word) {
  var hangmanWord = word;
  var guessWord, targetWordArray, errorCounter, notGuessedLetterArray, temp;
  setPropertyValue();
  function setPropertyValue(setGuessWord) {
    if (setGuessWord !== undefined) {
      guessWord = setGuessWord;
    } else if (setGuessWord === undefined) {
      guessWord = hangmanWord;
    }
    if (Array.isArray(notGuessedLetterArray)) {
      notGuessedLetterArray.length = 0;
    } else {
      notGuessedLetterArray = [];
    }
    targetWordArray = guessWord.split("");
    errorCounter = 6;
    temp = [];
    for (var i = 0; i < guessWord.length; i++) {
      temp[i] = "_";
    }
    return this;
  }
  this.startAgain = function (newGuessWord) {
    if (isString(newGuessWord)) {
      setPropertyValue(newGuessWord);
    } else {
      console.log("The value entered is not a string/symbol")
    }
  };
  this.guess = function (letter) {
    if (isString(letter)) {
      if (targetWordArray.indexOf(letter) !== -1) {
        targetWordArray.forEach(function (elem, index) {
          if (elem === letter) {
            temp[index] = letter;
          }
        });
        if (guessWord !== temp.join("")) {
          console.log(temp.join(""));
        } else {
          console.log(temp.join("") + " | You won!")
        }
      } else if (targetWordArray.indexOf(letter) === -1) {
        notGuessedLetterArray.push(letter);
        errorCounter--;
        console.log("wrong letter, errors left " + errorCounter + " | " + notGuessedLetterArray);
      }
    } else {
      console.log("The value entered is not a string")
    }
    return this;
  };
  this.getGuessedString = function () {
    console.log(temp.join(""));
    return temp.join("");
  };
  this.getErrorsLeft = function () {
    console.log(errorCounter);
    return errorCounter;
  };
  this.getWrongSymbols = function () {
    console.log(notGuessedLetterArray);
    return notGuessedLetterArray;
  };
  this.getStatus = function () {
    console.log(temp.join("") + " | " + "errors left " + errorCounter);
    return this;
  };
}
function isString(value) {
  return Object.prototype.toString.call(value) === "[object String]";
}

var newHangman = new Hangman("webpurple");

module.exports = newHangman;
