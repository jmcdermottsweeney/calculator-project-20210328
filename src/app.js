// Project guide: https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Calculator-App.md

let el = (element) => {
    // If passed an id
    if (element.charAt(0) === '#') {
        return document.querySelector(element);
    }
    // Otherwise get a nodelist of class
    return document.querySelectorAll(element);
}

let form = el('#calc__form'),
    input = el('#calc__input'),
    previousCalc = el('#calc__previous-calculation'),
    numbers = el('.btn__num'),
    operators = el('.btn__operator'),
    allClear = el('#btn__all-clear'),
    del = el('#btn__delete'),
    currentOperator = undefined,
    oldOperator = undefined,
    newNum = undefined,
    oldNum = undefined,
    resultNum = 0;

let formSubmit = form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (input.value.length !== 0) {
        setNum(input.value);
        seePreviousCalc();
    }
});

numbers.forEach(e => e.onclick = () => {
    (e.innerHTML === '.' && input.value.indexOf('.') !== -1) ? false : input.value += e.innerHTML;
});

operators.forEach(e => e.onclick = () => {
    currentOperator = e.innerHTML;
    input.value = '';
    console.log('Operator: ' + currentOperator);
});

let setNum = (val) => {
    if (newNum !== undefined) {
        oldNum = newNum;
        newNum = val;
    } else {
        newNum = val;
    }
    // console.log('New value: ' + newNum);
    // console.log('Old value: ' + oldNum);
}

let seePreviousCalc = () => {
    if (newNum !== undefined && oldNum !== undefined) {
        previousCalc.innerHTML = oldNum + ' ' + currentOperator + ' ' + newNum;
    } else if (oldNum === undefined) {
        previousCalc.innerHTML = newNum;
    } else {
        previousCalc.innerHTML = '0';
    }
}

// checks that the input key is a valid number 0-9, or a decimal value
let typingNumbers = input.onkeypress = (event) => {
    let char = event.key;
    let approvedNums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
    let approvedOps = ['+', '-', '*', '/'];

    approvedNums.every(e => {
        console.log(e);
        if (checkChar(char, e)) {
            return true;
        } return false;
    });

    // let char = (event.which) ? event.which : event.keyCode;
    // if (char === 46) {
    //     if (input.value.indexOf('.') === -1) {
    //         return true;
    //     } return false;
    // }
    // if (char !== 46 && char > 31 && (char < 48 || char > 57)) {
    //     return false;
    // } else {
    //     return true;
    // }
}

let checkChar = (char, filter) => {
    if (char === filter) {
        return true;
    } return false;
}

allClear.onclick = () => {
    form.reset();
    previousCalc.innerHTML = '0';
    newNum = undefined;
    oldNum = undefined;
    currentOperator = undefined;
    oldOperator = undefined;
}

del.onclick = () => {
    if (input.value.length !== 0) {
        input.value = input.value.slice(0, (input.value.length - 1));
    }
}