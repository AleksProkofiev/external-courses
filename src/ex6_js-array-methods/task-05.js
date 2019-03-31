function methodCopyMap(array, callback) {
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
        newArray.push(callback(array[i], i, array));
    }
    return newArray;
}

module.exports = methodCopyMap;