class Calculator {
  cachedResult = null;
  numberInScreen = null;
  operator = null;

  pressNumber(number) {
    this.numberInScreen = number;
  }

  pressSum() {
    this.operator = this.sum;
    this.#afterOperatorPressed();
  }
  pressSubtract() {
    this.operator = this.subtract;
    this.#afterOperatorPressed();
  }
  pressMultiply() {
    this.operator = this.multiply;
    this.#afterOperatorPressed();
  }
  pressDivide() {
    this.operator = this.divide;
    this.#afterOperatorPressed();
  }

  pressEquals() {
    this.#calculate();
  }

  sum(a, b) {
    return a + b;
  }

  subtract(a, b) {
    return a - b;
  }

  multiply(a, b) {
    return a * b;
  }

  divide(a, b) {
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

function runTests() {
  test1();
  test2();
  test3();
  test4();
  test5();
  test6();
  test7();
  test8();

  function test1() {
    const calculator = new Calculator();
    calculator.pressSum();
    const result = calculator.cachedResult === 0;
    console.log(result, "cached should be `0`", calculator);
  }

  function test2() {
    const calculator = new Calculator();
    calculator.pressSum();
    const result = calculator.cachedResult === 0;
    console.log(result, "cached should be `0`", calculator);
  }

  function test3() {
    const calculator = new Calculator();
    calculator.pressNumber(3);
    calculator.pressSum();
    const result =
      calculator.cachedResult === 3 && calculator.numberInScreen === null;
    console.log(
      result,
      "cached should be `3` and screen should be `null`",
      calculator,
    );
  }

  function test4() {
    const calculator = new Calculator();
    calculator.pressNumber(3);
    calculator.pressSum();
    calculator.pressNumber(4);
    calculator.pressSum();
    const result =
      calculator.cachedResult === 7 && calculator.numberInScreen === null;
    console.log(
      result,
      "cached should be `7` and screen should be `null`",
      calculator,
    );
  }

  function test5() {
    const calculator = new Calculator();
    calculator.pressNumber(3);
    calculator.pressSum();
    calculator.pressSubtract();
    const result =
      calculator.cachedResult === 3 &&
      calculator.operator === calculator.subtract;
    console.log(
      result,
      "cached should be `3` and operator should be `subtract`",
      calculator,
    );
  }

  function test6() {
    const calculator = new Calculator();
    calculator.pressNumber(3);
    calculator.pressSum();
    calculator.pressNumber(4);
    calculator.pressEquals();
    const result =
      calculator.cachedResult === 7 &&
      calculator.numberInScreen === null &&
      calculator.operator === null;
    console.log(
      result,
      "cached should be `7`, screen should be `null`, operator should be `null`",
      calculator,
    );
  }

  function test7() {
    const calculator = new Calculator();
    calculator.pressNumber(3);
    calculator.pressSum();
    calculator.pressNumber(4);
    calculator.pressEquals();
    calculator.pressSum();
    const result =
      calculator.cachedResult === 7 &&
      calculator.numberInScreen === null &&
      calculator.operator === calculator.sum;
    console.log(
      result,
      "cached should be `7`, screen should be `null`, operator should be `sum`",
      calculator,
    );
  }

  function test8() {
    const calculator = new Calculator();
    calculator.pressNumber(3);
    calculator.pressSum();
    calculator.pressNumber(4);
    calculator.pressEquals();
    calculator.pressNumber(5);
    const result =
      calculator.cachedResult === null && calculator.numberInScreen === 5;
    console.log(
      result,
      "cached should be `null`, screen should be `5`",
      calculator,
    );
  }
}
runTests();
