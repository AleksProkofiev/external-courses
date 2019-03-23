function toUpperCaseEachWord(string) {
    var arr = string.split(" ");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].slice(0, 1).toUpperCase() + arr[i].slice(1);
    }
    return arr.join(" ");
}

module.exports = toUpperCaseEachWord;