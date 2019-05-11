function EngineeringCalculator(){
  Calc.call(this);
  EngineeringCalculator.prototype = Object(Calc.prototype);
  this.getResult = function(numberOfDecimalPlaces) {
    if (numberOfDecimalPlaces) {
      if (Array.isArray(this.currentValue)) {
        return temp = this.currentValue.map(elem => elem.toFixed(2));
      } else {
        return +(this.currentValue.toFixed(numberOfDecimalPlaces));
      }
    } else {
      return this.currentValue;
    }
  };
  this.getSquareRoot = function(value) {
    if (value > 0) {
      this.currentValue = Math.sqrt(value);
    } else if (value <= 0){
      console.log("Enter a number greater than zero")
    } else {
      this.currentValue = Math.sqrt(this.currentValue);
    }
    return this;
  };
  this.getExponentiation = function (value1, value2) {
    if (value1 && value2) {
      return this.currentValue = Math.pow(value1, value2);
    } else {
      console.log("Enter value1, value1");
    }
  }
}
