function hasPropertyInPrototype(propName, object) {
  //var count = 0;
  for (var key in object) {
    if (!object.hasOwnProperty(propName) && object[propName]) {
        return object[propName];
    }
  }return undefined;
}

module.exports = hasPropertyInPrototype;