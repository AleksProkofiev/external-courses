function getReversString(string) {
  var arr = string.split("");
  return arr.reverse().join("");
}

module.exports = getReversString;