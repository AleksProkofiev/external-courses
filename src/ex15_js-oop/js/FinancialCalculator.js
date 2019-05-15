function FinancialCalculator() {
  EngineeringCalculator.call(this);
}
FinancialCalculator.prototype = Object.create(EngineeringCalculator.prototype);
FinancialCalculator.prototype.constructor = FinancialCalculator;

//calculation of the monthly payment of the amount of overpayment on the entered data;
//output is an array [monthly payment, amount of overpayment]
FinancialCalculator.prototype.autoLoanCalculator = function (autoCost, initialPayment, loanPeriodMonths, interestRate) {
    if (arguments.length === 4) {
      if (Array.from(arguments).every(isNumeric)) {
        var sum = autoCost - initialPayment;
        var interestRateMonth = interestRate / 100 / 12;
        var monthlyPayment = sum * (interestRateMonth + (interestRateMonth
          / (this.getExponentiation((1 + interestRateMonth), loanPeriodMonths) - 1)));
        var overpayment = monthlyPayment * loanPeriodMonths - sum;
        this.currentValue = [monthlyPayment, overpayment];
      }else {
        console.log("Enter all parameters");
      }
    } else {
      console.log("Enter all parameters");
    }
    return this;
  };


var temp = new FinancialCalculator();
temp.reset();
// temp.add(10);
// temp.autoLoanCalculator(60000, 14, 12, 15);
temp.getExponentiation(22.11, 2);
console.log(temp.getResultToFixed(3));