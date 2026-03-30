class Calculator {
  numberInMemory = null;
  numberInScreen = null;
  operator = null;



  #calculate() {
    const result = this.#operate(
      this.numberInMemory,
      this.numberInScreen,
      this.operator,
    );
    console.log("result = ", result);
  }

  #operate(a, b, func) {
    return func(a, b);
  }

  #sum(a, b) {
    return a + b;
  }

  #subtract(a, b) {
    return a - b;
  }

  #multiply(a, b) {
    return a * b;
  }

  #divide(a, b) {
    return a / b;
  }
}

const calculator = new Calculator();

calculator.numberInMemory = 3;
calculator.numberInScreen = 4;
// calculator.operator = calculator.#sum;
// calculator.#calculate();
