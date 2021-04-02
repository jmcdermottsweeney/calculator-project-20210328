// Project guide: https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Calculator-App.md

let el = (element) => {
  // If passed an id
  if (element.charAt(0) === "#") {
    return document.querySelector(element);
  }
  // Otherwise get a nodelist of class
  return document.querySelectorAll(element);
};

const form = el("#calc__form"),
  input = el("#calc__input"),
  numbers = el(".btn__num"),
  operators = el(".btn__operator"),
  allClear = el("#btn__all-clear"),
  del = el("#btn__delete"),
  previousCalc = el("#calc__previous-calculation");

let inputVal = "",
  validOpr = new RegExp(/^[\+\-\*\/]$/),
  currentOperator = undefined,
  oldOperator = undefined,
  validNum = new RegExp(/^[\d\.]$/),
  newNum = undefined,
  oldNum = undefined,
  resultNum = 0;

let validateInputVal = (val) => {
  for (let i = 0; i < val.length; i++) {
    if (
      !validNum.test(val[i]) ||
      (val[i] === "." && val.indexOf(".") !== -1)
    ) {
       val = val.slice(i,2);
    }
    if (validOpr.test(val[i])) {
      console.log("Detected a valid operator");
    }
  }
  input.value = val;
  console.log(val);
};

// checks that the input key is a valid number 0-9, or a decimal value
let inputNums = (input.onkeypress = (event) => {
  let char = String.fromCharCode(event.which);
  inputVal += char;
  input.value = '';
  validateInputVal(inputVal);
  // if (
  //   !validNum.test(char) ||
  //   (char === "." && input.value.indexOf(".") !== -1)
  // ) {
  //   event.preventDefault();
  // } else {
  //   inputVal += char;
  // }
  // if (validOpr.test(char)) {
  //   console.log("Detected a valid operator");
  // }
});

let clickNums = numbers.forEach(
  (el) =>
    (el.onclick = () => {
      inputVal += el.innerHTML;
      validateInputVal(inputVal);
    })
);

let clickOprs = operators.forEach(
  (el) =>
    (el.onclick = () => {
      currentOperator = el.innerHTML;
      newNum = input.value;
      console.log("Operator: " + currentOperator);
    })
);

let clickAC = (allClear.onclick = () => {
  form.reset();
  previousCalc.innerHTML = "0";
  newNum = undefined;
  oldNum = undefined;
  currentOperator = undefined;
  oldOperator = undefined;
});

let clickDel = (del.onclick = () => {
  if (input.value.length !== 0) {
    input.value = input.value.slice(0, input.value.length - 1);
  }
});
