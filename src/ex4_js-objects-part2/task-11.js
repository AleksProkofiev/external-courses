function getTotalOfRepetitionsOfSymbol(string) {
    var arr = string.split(""),
        result = {};
    for (var i = 0; i < arr.length; i++) {
        var regExp = new RegExp(arr[i], "g");
        result[arr[i]] = string.match(regExp).length;
    }
    for (key in result) {
      if (result.hasOwnProperty(key)) {
          console.log(key + ": " + result[key]);
      }
    }
}

module.exports = getTotalOfRepetitionsOfSymbol;


