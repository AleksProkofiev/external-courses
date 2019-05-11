function AccountingCalculator(){
  Calc.call(this);
  AccountingCalculator.prototype = Object(Calc.prototype);

  this.getIncomeTax = function (value) {
    this.currentValue = value / 100 * 13;
    return this;
  };
  this.getVatIncluding = function(value) {
    // НДС = С / 1,20 × 0,20
    this.currentValue = value / 1.2 * 0.20;
    return this;
  };
  this.getVatOfAmount = function (value) {
    // НДС = НБ × Нст / 100
    this.currentValue = value * 20 / 100;
    return this;
  };
  this.getAmountWithVat = function(value) {
    // С = НБ × 1,20
    this.currentValue = value * 1.2;
    return this;
  };
}