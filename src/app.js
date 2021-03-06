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
  newOpr = undefined,
  oldOpr = undefined,
  validNum = new RegExp(/^[\d\.]$/),
  newNum = undefined,
  oldNum = undefined,
  resultNum = 0;

let validateInputVal = (val) => {
  console.log('The char value is: ' + val);
  if (validNum.test(val[0])) {
    console.log('Valid number detected: ' + val);
    if (val === '.' && (inputVal.split('.').length - 1 === 1)) {
      console.log('Too many decimals!');
      val = '';
    }
  } else {
    val = '';
  }
  if (validOpr.test(val)) {
    console.log('Valid operator detected: ' + val[0]);
    val = '';
  }
  return val;
};

// checks that the input key is a valid number 0-9, or a decimal value
let inputNums = (input.onkeydown = (event) => {
  event.preventDefault();
  let char = event.key;
  console.log('event.key is: ' + char);
  if (event.which === 8) {
    clickDel();
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
      console.log('Clicked value is: ' + el.innerHTML);
      inputVal += validateInputVal(el.innerHTML);
      input.value = inputVal;
      console.log('input.value is: ' + input.value);
      console.log('====');
    })
);

let clickOprs = operators.forEach(
  (el) =>
    (el.onclick = () => {
      newOpr = el.innerHTML;
      newNum = input.value;
      console.log('Operator: ' + newOpr);
    })
);

let switchOpr = (opr) => {
  if (oldOpr === undefined && newOpr === undefined) {
    newOpr = opr;
  } else {
    oldOpr = newOpr;
    newOpr = opr;
  }
};

let clickAC = (allClear.onclick = () => {
  form.reset();
  inputVal = '';
  input.value = '';
  previousCalc.innerHTML = '0';
  newNum = undefined;
  oldNum = undefined;
  newOpr = undefined;
  oldOpr = undefined;
});

let clickDel = (del.onclick = () => {
  if (input.value.length !== 0) {
    input.value = input.value.slice(0, input.value.length - 1);
    inputVal = input.value;
    console.log('Updated value is: ' + input.value);
    console.log('The new value of inputVal is: ' + inputVal);
  }
});
