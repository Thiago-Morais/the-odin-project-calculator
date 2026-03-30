let numberInMemory = 0;
let numberInScreen = 0;
let operator = null;

// numberInMemory = 3;
// numberInScreen = 4;
// operator = sum;
// operate();

function operate() {
  const result = operator(numberInMemory, numberInScreen);
  console.log("result = ", result);
  numberInMemory = result;
}

function operateWith(a, b, func) {
  return func(a, b);
}

function sum(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}
