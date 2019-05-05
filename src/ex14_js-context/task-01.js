function Calc(){
  this.currentValue = 0;
  this.add = function(value){
    if(isNumeric(value)){
      this.currentValue += value;
    }
    return this;
  };
  this.subtract = function (value){
    if(isNumeric(value)){
      this.currentValue -= value;
    }
    return this;
  };
  this.divide = function (value){
    if(isNumeric(value)){
      this.currentValue /= value;
    }
    return this;
  };
  this.multiply = function (value){
    if(isNumeric(value)){
      this.currentValue *= value;
    }
    return this;
  };
  this.getResult = function (){
    return this.currentValue;
  };
  this.reset = function (){
    this.currentValue = 0;
    return this;
  };
  this.setState = function (value) {
    if (value) {
      this.currentValue = value;
    }
    return this;
  };

  this.fetchData = function(callback){
    setTimeout(function()
    {callback(500)},2000);
    return this;
  }
}

function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

var Calculator = new Calc();

module.exports = Calculator;

