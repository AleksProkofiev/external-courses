function Calc(){
  var currentValue = 0;

  function add(value){
    if(isNumeric(value)){
      currentValue += value;
    }
    return add;
  }

  function subtract(value){
    if(isNumeric(value)){
      currentValue -= value;
    }
    return subtract;
  }

  function divide(value){
    if(isNumeric(value)){
      currentValue /= value;
    }
    return divide;
  }

  function multiply(value){
    if(isNumeric(value)){
      currentValue *= value;
    }
    return multiply;
  }

  function getResult(){
    return currentValue;
  }

  function reset(){
    currentValue = 0;
  }

  return {add, subtract, divide, multiply, getResult, reset}
};

function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

var Calculator = new Calc();

module.exports = Calculator;

