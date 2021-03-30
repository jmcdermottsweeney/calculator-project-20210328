// Project guide: https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Calculator-App.md

let el = (element) => {
    // If passed an id
    if (element.charAt(0) === '#') {
        return document.querySelector(element);
    }
    // Otherwise get a nodelist of class
    return document.querySelectorAll(element);
}

let form = el('#calc__form');
let input = el('#calc__input');
let previousCalc = el('#calc__previous-calculation');

let formSubmit = form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (isValidInput) {
        setNum(input.value);
        seePreviousCalc();
        console.log('New value: ' + newNum);
        console.log('Old value: ' + oldNum);
    }
});

let numbers = el('.btn__num');
numbers.forEach(e => e.onclick = () => input.value += String(e.innerHTML));

let operators = el('.btn__operator');

let newNum = undefined,
    oldNum = undefined,
    resultNum = 0;

let setNum = (val) => {
    if (newNum !== undefined) {
        oldNum = newNum;
        newNum = val;
    } else {
        newNum = val;
    }
}

let seePreviousCalc = () => {
    if (newNum !== undefined && oldNum !== undefined) {
        previousCalc.classList.add('active');
        previousCalc.innerHTML = oldNum + ' # ' + newNum;
    }
}

// checks that the input key is a valid number 0-9, or a decimal value
let isValidInput = input.onkeypress = (event) => {
    let char = (event.which) ? event.which : event.keyCode;
    if (char === 46) {
        if (input.value.indexOf('.') === -1) {
            return true;
        } return false;
    }
    if (char !== 46 && char > 31 && (char < 48 || char > 57)) {
        console.log('isValidInput === false');
        return false;
    }
    console.log('isValidInput === true');
    return true;
}

// let del = el('#btn__delete'),
//     allClear = el('#btn__all-clear'),
//     calculate = el('#btn__calculate');