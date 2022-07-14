import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-calculator",
  templateUrl: "./calculator.component.html",
  styleUrls: ["./calculator.component.scss"],
})
export class CalculatorComponent implements OnInit {
  public currentNumber = "0";
  private firstNumber: any = null;
  private operator: any = null;
  private waitForSecondNumber = false;

  constructor() {}

  ngOnInit() {}

  getNumber(value: string) {
    if (this.waitForSecondNumber) {
      this.currentNumber = value;
      this.waitForSecondNumber = false;
    } else {
      this.currentNumber === "0"
        ? this.currentNumber = value
        : this.currentNumber += value;
    }
  }

  getDecimal() {
    if (!this.currentNumber.includes(".")) {
      this.currentNumber += ".";
    }
  }

  private doCalculation(operator: string, secondNumber: number) {
    switch (operator) {
      case "+":
        return (this.firstNumber += secondNumber);
      case "-":
        return (this.firstNumber -= secondNumber);
      case "x":
        return (this.firstNumber *= secondNumber);
      case "/":
        return (this.firstNumber /= secondNumber);
      case "=":
        return secondNumber;
    }
  }

  getOperation(operator: string) {
    if (this.firstNumber === null) {
      this.firstNumber = Number(this.currentNumber);
    } else if (this.operator) {
      const result = this.doCalculation(this.operator, Number(this.currentNumber));
      this.currentNumber = String(result);
      this.firstNumber = result;
    }
    this.operator = operator;
    this.waitForSecondNumber = true;
  }

  cleanUp() {
    this.currentNumber = "0";
    this.firstNumber = null;
    this.operator = null;
    this.waitForSecondNumber = false;
  }
}
