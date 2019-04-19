function removeFirstAndLastSpaces(string) {
    var newString = string.slice(1, -1);
    return newString;
}

module.exports = removeFirstAndLastSpaces;
