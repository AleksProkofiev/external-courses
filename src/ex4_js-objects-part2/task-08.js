function toLowerCamelCase(string) {
    var arr = string.split(" ");
    arr[0] = arr[0].toLowerCase();
    for (var i = 1; i < arr.length; i++) {
        arr[i] = arr[i].slice(0, 1).toUpperCase() + arr[i].slice(1).toLowerCase();
    }
    return arr.join("");
}

module.exports = toLowerCamelCase;
