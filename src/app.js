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
  currentOpr = undefined,
  oldOpr = undefined,
  newNum = undefined,
  oldNum = undefined,
  resultNum = 0;

let validateInputVal = (val) => {
  if (val >= 48 && val <= 57) {
    console.log('Valid number char: ' + String.fromCharCode(val));
    val = String.fromCharCode(val);
  } else if (val >= 96 && val <= 105) {
    val -= 48;
    val = String.fromCharCode(val);
    console.log('Valid number char: ' + String.fromCharCode(val));
  } else if (val === 46 || val === 110 || val === 190) {
    if (inputVal.split('.').length - 1 === 1) {
      val = '';
    } else {
      val = '.';
    }
  } else {
    console.log('Invalid char: ' + val);
    val = '';
  }
  return val;
};

// checks that the input key is a valid number 0-9, or a decimal value
let inputNums = (input.onkeydown = (event) => {
  event.preventDefault();
  let char = event.which;
  console.log(event.key);
  if (char === 8) {
    input.value = input.value.substr(0, input.value.length - 1);
    inputVal = input.value;
    console.log('Updated value is: ' + input.value);
  } else {
    console.log('Char code is: ' + char);
    inputVal += validateInputVal(char);
    console.log('Number of decimals: ' + (inputVal.split('.').length - 1));
    input.value = inputVal;
    console.log('inputVal is: ' + inputVal);
    console.log('====');
  }
});

let clickNums = numbers.forEach(
  (el) =>
    (el.onclick = () => {
      console.log('Clicked value is: ' + el.innerHTML.charCodeAt(0));
      inputVal += validateInputVal(el.innerHTML.charCodeAt(0));
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
  inputVal = '';
  input.value = '';
  previousCalc.innerHTML = '0';
  newNum = undefined;
  oldNum = undefined;
  currentOpr = undefined;
  oldOpr = undefined;
});

let clickDel = (del.onclick = () => {
  if (input.value.length !== 0) {
    input.value = input.value.slice(0, input.value.length - 1);
    inputVal = input.value;
    console.log(input.value);
    console.log(inputVal);
  }
});
