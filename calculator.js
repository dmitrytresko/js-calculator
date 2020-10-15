const numberBtns = document.getElementsByClassName('number');
const numbersArr = Array.from(numberBtns);
const operationBtns = document.getElementsByClassName('operation');
const operationsArr = Array.from(operationBtns);
const equalBtn = document.getElementById('equal-btn');
const clearBtn = document.getElementById('clear-btn');
const changeBtn = document.getElementById('change-sign-btn');
const percentBtn = document.getElementById('percent-btn');
const operandTextEl = document.querySelector('.calc-screen__operand');

class Calculator {
    constructor(operandTextEl) {
        this.operandTextEl = operandTextEl;
        this.clearScreen();
    }

    clearScreen() {
        this.operand = '';
        this.operation = undefined;
    }

    insertNumber(num) {
        if (num === '.' && this.operand.includes('.')) return;
        this.operand += num;
        this.updateScreen();
    }

    showNumberCorrectly(num) {
        let number = parseFloat(num);
        if (isNaN(number)) return '';
        return number.toLocaleString('ru');
    }

    selectOperation(operation) {
        if (this.operand === '') return;
        if (this.previousOperand !== '') this.calculate();
        this.operation = operation;
        this.previousOperand = this.operand;
        this.operand = '';
    }

    calculate() {
        let result;
        let prevOperand = parseFloat(this.previousOperand);
        let curOperand = parseFloat(this.operand);
        if (isNaN(prevOperand) || isNaN(curOperand)) return;

        switch (this.operation) {
            case '÷':
                result = prevOperand / curOperand;
                break;
            case '×':
                result = prevOperand * curOperand;
                break;
            case '-':
                result = prevOperand - curOperand;
                break;
            case '+':
                result = prevOperand + curOperand;
                break;
            default:
                return;
        }
        this.operand = result;
        this.operation = undefined;
        this.previousOperand = '';
    }

    changeSign() {
        let curOperand = parseFloat(this.operand);
        let negativeOperand = -curOperand;
        this.operand = negativeOperand;
    }

    percentage() {
        let percentValue = this.operand * 0.01;
        this.operand = percentValue;
    }

    updateScreen() {
        this.operandTextEl.innerText = this.showNumberCorrectly(this.operand);
    }
}

const calc = new Calculator(operandTextEl);

numbersArr.forEach(button => {
    button.addEventListener('click', () => {
        calc.insertNumber(button.innerHTML);
    });
});

operationsArr.forEach(button => {
    button.addEventListener('click', () => {
        calc.selectOperation(button.innerHTML);
        calc.updateScreen();
    });
});

equalBtn.addEventListener('click', button => {
    calc.calculate();
    calc.updateScreen();
})

clearBtn.addEventListener('click', button => {
    calc.clearScreen();
    calc.updateScreen();
})

changeBtn.addEventListener('click', button => {
    calc.changeSign();
    calc.updateScreen();
})

percentBtn.addEventListener('click', button => {
    calc.percentage();
    calc.updateScreen();
})