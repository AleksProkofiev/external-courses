function Storage(storageKey) {
  let key = storageKey,
    object;
  this.set = function(value) {
    object = JSON.stringify(value);
    localStorage.setItem(key, object);
  };
  this.get = function() {
    return JSON.parse(localStorage.getItem(key))
  };
  this.clear = function() {
    localStorage.removeItem(key);
  };
}