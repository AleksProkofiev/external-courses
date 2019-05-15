function EngineeringCalculator() {
  Calc.call(this);
}
EngineeringCalculator.prototype = Object.create(Calc.prototype);
EngineeringCalculator.prototype.constructor = EngineeringCalculator;

EngineeringCalculator.prototype.getResultToFixed = function(numberOfDecimalPlaces) {
    if (isNumeric(numberOfDecimalPlaces)) {
      if (Array.isArray(this.currentValue)) {
         temp = this.currentValue.map(elem => elem.toFixed(numberOfDecimalPlaces));
        return temp;
      }
      return +(this.currentValue.toFixed(numberOfDecimalPlaces));
    }
    return this.currentValue;
  };

EngineeringCalculator.prototype.getSquareRoot = function(value) {
  if (isNumeric(value)) {
    if (value > 0) {
      this.currentValue = Math.sqrt(value);
    } else if (value <= 0) {
      console.log("Enter a number greater than zero")
    } else {
      this.currentValue = Math.sqrt(this.currentValue);
    }
  }
    return this;
  };

EngineeringCalculator.prototype.getExponentiation = function (value1, value2) {
   if (isNumeric(value1) && isNumeric(value2)) {
      this.currentValue = Math.pow(value1, value2);
    } else if (!value1 || !value2) {
     console.log("Enter value1, value2");
   }
    return this;
  }


