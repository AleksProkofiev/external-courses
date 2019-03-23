function toUpperCaseInitialLetter(string) {
    var newString = string.slice(0, 1).toUpperCase() + string.slice(1);
    return newString;
}

module.exports = toUpperCaseInitialLetter;