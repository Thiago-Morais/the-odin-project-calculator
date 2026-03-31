class Calculator {
  cachedResult = null;
  numberInScreen = null;
  operator = null;

  pressNumber(number) {
    this.numberInScreen = number;
  }

  pressSum() {
    this.operator = this.#sum;
    this.#afterOperatorPressed();
  }
  pressSubtract() {
    this.operator = this.#subtract;
    this.#afterOperatorPressed();
  }
  pressMultiply() {
    this.operator = this.#multiply;
    this.#afterOperatorPressed();
  }
  pressDivide() {
    this.operator = this.#divide;
    this.#afterOperatorPressed();
  }

  pressEquals() {
    this.#calculate();
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

  #afterOperatorPressed() {
    const numberWasPressed = this.numberInScreen !== null;
    const hasCachedResult = this.cachedResult !== null;
    if (isFirstButtonPress()) {
      this.cachedResult = 0;
      return;
    }

    if (isFirstCalculation()) {
      this.cachedResult = this.numberInScreen;
      this.numberInScreen = null;
      return;
    }

    if (isChainOperation()) {
      this.#calculate();
      return;
    }

    if (isOverridingOperation()) {
      return;
    }

    /*
     * Has no Cache + User hasn't Pressed  (First button, without number)
     *    Use `0` as Cache
     * Has no Cache + User Pressed (First calculation)
     *    Use the Pressed number as Cache
     * Has Cache + User Pressed (Valid chain calculation)
     *    Calculate
     * Has Cache + User hasn't Pressed (Just made a calculation)
     *    Invalid Operation (?)
     */

    function isFirstButtonPress() {
      return !hasCachedResult && !numberWasPressed;
    }
    function isFirstCalculation() {
      return !hasCachedResult && numberWasPressed;
    }
    function isChainOperation() {
      return hasCachedResult && numberWasPressed;
    }
    function isOverridingOperation() {
      return hasCachedResult && !numberWasPressed;
    }
  }

  #calculate() {
    const result = this.#operate(
      this.cachedResult,
      this.numberInScreen,
      this.operator,
    );
    console.log("result = ", result);
    this.cachedResult = result;
    this.numberInScreen = null;
    this.operator = null;
  }

  #operate(a, b, func) {
    return func(a, b);
  }
}

runTests();
function runTests() {
  let calculator = new Calculator();
  calculator.pressSum();
  console.log("cached should be `0`", calculator);

  calculator = new Calculator();
  calculator.pressNumber(3);
  calculator.pressSum();
  console.log("cached should be `3` and screen should be `null`", calculator);

  calculator = new Calculator();
  calculator.pressNumber(3);
  calculator.pressSum();
  calculator.pressNumber(4);
  calculator.pressSum();
  console.log("cached should be `7` and screen should be `null`", calculator);

  calculator = new Calculator();
  calculator.pressNumber(3);
  calculator.pressSum();
  calculator.pressSubtract();
  console.log(
    "cached should be `3` and operator should be `subtract`",
    calculator,
  );

  calculator = new Calculator();
  calculator.pressNumber(3);
  calculator.pressSum();
  calculator.pressNumber(4);
  calculator.pressEquals();
  console.log(
    "cached should be `7`, screen should be `null`, operator should be `null`",
    calculator,
  );

  calculator = new Calculator();
  calculator.pressNumber(3);
  calculator.pressSum();
  calculator.pressNumber(4);
  calculator.pressEquals();
  calculator.pressSum();
  console.log(
    "cached should be `7`, screen should be `null`, operator should be `sum`",
    calculator,
  );

  calculator = new Calculator();
  calculator.pressNumber(3);
  calculator.pressSum();
  calculator.pressNumber(4);
  calculator.pressEquals();
  calculator.pressNumber(5);
  console.log("cached should be `null`, screen should be `5`", calculator);
}
