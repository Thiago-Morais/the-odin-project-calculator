// ====> Backend <====
class Calculator {
  cachedResult = null;
  inputtedNumber = null;
  operator = null;

  pressNumber(number) {
    console.log("pressed: ", number);
    this.inputtedNumber = number;
    if (this.operator === null) {
      this.cachedResult = null;
    }
  }

  pressSum() {
    console.log("pressed: sum");
    this.operator = this.sum;
    this.#afterOperatorPressed();
  }
  pressSubtract() {
    console.log("pressed: subtract");
    this.operator = this.subtract;
    this.#afterOperatorPressed();
  }
  pressMultiply() {
    console.log("pressed: multiply");
    this.operator = this.multiply;
    this.#afterOperatorPressed();
  }
  pressDivide() {
    console.log("pressed: divide");
    this.operator = this.divide;
    this.#afterOperatorPressed();
  }

  pressEquals() {
    if (this.operator === null) {
      console.log("no operator was pressed");
      return;
    }
    console.log("pressed: equals");
    this.#calculate();
    this.operator = null;
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
    const numberWasPressed = this.inputtedNumber !== null;
    const hasCachedResult = this.cachedResult !== null;
    if (isFirstButtonPress()) {
      this.cachedResult = 0;
      return;
    }

    if (isFirstCalculation()) {
      this.cachedResult = this.inputtedNumber;
      this.inputtedNumber = null;
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
      this.inputtedNumber,
      this.operator,
    );
    console.log("result = ", result);
    this.cachedResult = result;
    this.inputtedNumber = null;
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
  test9();

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
      calculator.cachedResult === 3 && calculator.inputtedNumber === null;
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
      calculator.cachedResult === 7 && calculator.inputtedNumber === null;
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
      calculator.cachedResult === 7 && calculator.inputtedNumber === null;
    console.log(
      result,
      "cached should be `7`, screen should be `null`",
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
      calculator.inputtedNumber === null &&
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
      calculator.cachedResult === null && calculator.inputtedNumber === 5;
    console.log(
      result,
      "cached should be `null`, screen should be `5`",
      calculator,
    );
  }

  function test9() {
    const calculator = new Calculator();
    calculator.pressNumber(2);
    calculator.pressSum();
    calculator.pressNumber(3);
    calculator.pressSum();
    calculator.pressNumber(4);
    calculator.pressEquals();
    const result = calculator.cachedResult === 9;
    console.log(result, "screen should be `9`", calculator);
  }
}
runTests();

// ====> Frontend <====
const calculator = new Calculator();

const buttonMapping = [
  { id: "#add", func: () => calculator.pressSum() },
  { id: "#subtract", func: () => calculator.pressSubtract() },
  { id: "#multiply", func: () => calculator.pressMultiply() },
  { id: "#divide", func: () => calculator.pressDivide() },
  { id: "#equals", func: () => calculator.pressEquals() },
  { id: "#number-0", func: () => calculator.pressNumber(0) },
  { id: "#number-1", func: () => calculator.pressNumber(1) },
  { id: "#number-2", func: () => calculator.pressNumber(2) },
  { id: "#number-3", func: () => calculator.pressNumber(3) },
  { id: "#number-4", func: () => calculator.pressNumber(4) },
  { id: "#number-5", func: () => calculator.pressNumber(5) },
  { id: "#number-6", func: () => calculator.pressNumber(6) },
  { id: "#number-7", func: () => calculator.pressNumber(7) },
  { id: "#number-8", func: () => calculator.pressNumber(8) },
  { id: "#number-9", func: () => calculator.pressNumber(9) },
];

buttonMapping.forEach((element) => {
  const button = document.querySelector(element.id);
  button.addEventListener("click", () => {
    element.func();
  });
});
