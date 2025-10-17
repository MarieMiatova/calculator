const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator-keys');
const screen = calculator.querySelector('.calculator-screen');

const calculate = (n1, operator, n2) => {
    let result = 0;

    if (operator === 'add') {
        result = parseFloat(n1) + parseFloat(n2);
    } else if (operator === 'subtract') {
        result = parseFloat(n1) - parseFloat(n2);
    } else if (operator === 'multiply') {
        result = parseFloat(n1) * parseFloat(n2);
    } else if (operator === 'divide') {
        result = parseFloat(n1) / parseFloat(n2);
    }

    return result;
};

keys.addEventListener('click', event => {
    const target = event.target;
    const action = target.dataset.action;
    const key = target.textContent;
    const displayedNum = screen.value;
    const previousKey = calculator.dataset.previousKey;
    const previousNum = calculator.dataset.previousNum;
    const operator = calculator.dataset.operator;

    // Если нажата цифра
    if (!action) {
        if (displayedNum === '0' || previousKey === 'operator' || previousKey === 'calculate') {
            screen.value = key;
        } else {
            screen.value += key;
        }
        calculator.dataset.previousKey = 'number';
    }

    // Если нажата точка
    if (key === '.') {
        if (!displayedNum.includes('.') && displayedNum !== '0') {
            screen.value += '.';
        } else if (displayedNum === '0') {
            screen.value = '0.';
        }
        calculator.dataset.previousKey = 'decimal';
    }

    // Если нажата кнопка операции (+, -, *, /)
    if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
        calculator.dataset.previousNum = displayedNum;
        calculator.dataset.operator = action;
        calculator.dataset.previousKey = 'operator';
    }

    // Если нажата кнопка "="
    if (action === 'calculate') {
        const result = calculate(previousNum, operator, displayedNum);
        screen.value = result;
        calculator.dataset.previousKey = 'calculate';
        calculator.dataset.previousNum = undefined; // Сброс предыдущего числа
        calculator.dataset.operator = undefined; // Сброс оператора
    }

    // Если нажата кнопка "AC" (очистить)
    if (action === 'clear') {
        screen.value = '0';
        calculator.dataset.previousNum = undefined;
        calculator.dataset.operator = undefined;
        calculator.dataset.previousKey = undefined;
    }
});
