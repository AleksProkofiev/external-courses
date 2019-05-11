function methodCopyReduce(array, callback, initialValue) {
  var flag, previousValue;
  if (!initialValue) {
    flag = 1;
    previousValue = array[0];
  } else {
    flag = 0;
    previousValue = initialValue;
  };

  for (i = flag; i < array.length; i++) {
    previousValue = callback(previousValue, array[i], i, array);
  };

  return previousValue;
}

module.exports = methodCopyReduce;