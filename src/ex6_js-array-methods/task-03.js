function methodCopyEvery(array, callback) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            count++;
        }
    }
    return count === array.length;
}

module.exports = methodCopyEvery;