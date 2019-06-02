function Store(storeKey) {
  this.key = storeKey;
  this.object = null;
}

Store.prototype.set = function(value) {
  this.object = JSON.stringify(value);
  localStorage.setItem(this.key, this.object);
};

Store.prototype.get = function() {
  return JSON.parse(localStorage.getItem(this.key));
};

Store.prototype.clear = function() {
  localStorage.removeItem(this.key);
};