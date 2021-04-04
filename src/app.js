// Project guide: https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Calculator-App.md

let el = (element) => {
  // If passed an id
  if (element.charAt(0) === '#') {
    return document.querySelector(element);
  }
  // Otherwise get a nodelist of class
  return document.querySelectorAll(element);
};

const form = el('#calc__form'),
  input = el('#calc__input'),
  numbers = el('.btn__num'),
  operators = el('.btn__operator'),
  allClear = el('#btn__all-clear'),
  del = el('#btn__delete'),
  previousCalc = el('#calc__previous-calculation');

form.addEventListener('submit', (event) => event.preventDefault());

let inputVal = '',
  validOpr = new RegExp(/^[\+\-\*\/]$/),
  currentOpr = undefined,
  oldOpr = undefined,
  validNum = new RegExp(/^[\d\.]$/),
  newNum = undefined,
  oldNum = undefined,
  resultNum = 0;

let validateInputVal = (val) => {
  inputVal = val;
  for (let i = 0; i < val.length; i++) {
    if (validOpr.test(val[i]) && val[i] !== '.') {
      currentOpr = val[i];
      console.log('Valid operator detected: ' + currentOpr);
    }
    if (
      !validNum.test(val[i]) ||
      (val[i] === '.' && val.split('.').length - 1 > 1)
    ) {
      console.log(val[i] + ' is not a valid character');
      val = val.substr(0, val.length - 1);
    }
  }
  console.log('Validated value is: ' + val);
  return val;
};

// checks that the input key is a valid number 0-9, or a decimal value
let inputNums = (input.onkeydown = (event) => {
  event.preventDefault();
  let char = String.fromCharCode(event.which);
  console.log(char);
  inputVal += char;
  console.log('Typed value is: ' + inputVal);
  inputVal = validateInputVal(inputVal);
  input.value = inputVal;
  console.log('input.value is: ' + input.value);
  console.log('====');
});

let clickNums = numbers.forEach(
  (el) =>
    (el.onclick = () => {
      inputVal += el.innerHTML;
      console.log('Clicked value is: ' + inputVal);
      inputVal = validateInputVal(inputVal);
      input.value = inputVal;
      console.log('input.value is: ' + input.value);
      console.log('====');
    })
);

// let clickOprs = operators.forEach(
//   (el) =>
//     (el.onclick = () => {
//       currentOpr = el.innerHTML;
//       newNum = input.value;
//       console.log('Operator: ' + currentOpr);
//     })
// );

let clickAC = (allClear.onclick = () => {
  form.reset();
  previousCalc.innerHTML = '0';
  newNum = undefined;
  oldNum = undefined;
  currentOpr = undefined;
  oldOpr = undefined;
});

let clickDel = (del.onclick = () => {
  if (input.value.length !== 0) {
    input.value = input.value.slice(0, input.value.length - 1);
  }
});
