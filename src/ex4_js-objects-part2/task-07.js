function getShortString(string, number) {
  var newString = "";
  if (string.length > number) {
    newString = string.substr(0, number -1 ) + "…";
    return newString;
  }
  return string;
}

module.exports = getShortString;
