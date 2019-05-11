function FinancialCalculator() {
  EngineeringCalculator.call(this);
  FinancialCalculator.prototype = Object(EngineeringCalculator.prototype);

  this.autoLoanCalculator = function (autoCost, initialPayment, loanPeriodMonths, interestRate) {
    //calculation of the monthly payment of the amount of overpayment on the entered data;
    //output is an array [monthly payment, amount of overpayment]
    if (arguments.length === 4) {
      var sum = autoCost - initialPayment;
      var interestRateMonth = interestRate / 100 / 12;
      var monthlyPayment = sum * (interestRateMonth + (interestRateMonth
        / (this.getExponentiation((1 + interestRateMonth), loanPeriodMonths) - 1)));
      var overpayment = monthlyPayment * loanPeriodMonths - sum;
      this.currentValue = [monthlyPayment, overpayment];
    } else {
      console.log("Enter all parameters");
    }
    return this;
  };
}

// var temp = new FinancialCalculator();
// temp.reset();
// temp.autoLoanCalculator(60000, 10000, 12, 15);
// console.log(temp.getResult(2));