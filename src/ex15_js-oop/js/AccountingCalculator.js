function AccountingCalculator() {
  Calc.call(this);
}
AccountingCalculator.prototype = Object.create(Calc.prototype);
AccountingCalculator.prototype.constructor = AccountingCalculator;

AccountingCalculator.prototype.getIncomeTax = function (value) {
  if (isNumeric(value)) {
    this.currentValue = value / 100 * 13;
  }
  return this;
};
AccountingCalculator.prototype.getVatIncluding = function(value) {
    // НДС = С / 1,20 × 0,20
  if (isNumeric(value)) {
    this.currentValue = value / 1.2 * 0.20;
  }
  return this;
};
AccountingCalculator.prototype.getVatOfAmount = function (value) {
    // НДС = НБ × Нст / 100
  if (isNumeric(value)) {
    this.currentValue = value * 20 / 100;
  }
    return this;
};
AccountingCalculator.prototype.getAmountWithVat = function(value) {
    // С = НБ × 1,20
  if (isNumeric(value)) {
    this.currentValue = value * 1.2;
  }
    return this;
};

