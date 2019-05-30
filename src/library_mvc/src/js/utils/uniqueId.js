function getUniqueId() {
  let number1 = new Date().getTime().toString().slice(-5);
  let number2 = getRandomNumberMinMax(10, 99);
  let uniqueId = number1 + number2;
  return +uniqueId;
}

function getRandomNumberMinMax(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}