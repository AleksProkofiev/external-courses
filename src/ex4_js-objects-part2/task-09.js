function toInsertSubstringAfterIndex(string, substring, index) {
    var arr = string.split(" ");
    arr.splice(index + 1, 0, substring);
    return arr.join(" ");
}

module.exports = toInsertSubstringAfterIndex;