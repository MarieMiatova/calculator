const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.buttons');
const screen = document.getElementById('display');
const historyList = document.getElementById('history-list');

let previousNum = null;
let operator = null;
let previousKey = null;
let memory = 0;

const calculate = (n1, op, n2) => {
  const a = parseFloat(n1);
  const b = parseFloat(n2);
  if (isNaN(a) || isNaN(b)) return '';
  switch (op) {
    case '+': return (a + b).toString();
    case '−': return (a - b).toString();
    case '×': return (a * b).toString();
    case '÷': return b === 0 ? 'Error' : (a / b).toString();
    default: return '';
  }
};


function addToHistory(expression, result) {
  const li = document.createElement('li');
  li.textContent = `${expression} = ${result}`;
  historyList.prepend(li); 
}

keys.addEventListener('click', (e) => {
  const btn = e.target;
  if (btn.tagName !== 'BUTTON') return;

  const key = btn.textContent.trim();
  const displayed = screen.textContent.trim();


  if (!isNaN(key) && key !== '') {
    if (displayed === '0' || previousKey === 'operator' || previousKey === 'calculate') {
      screen.textContent = key;
    } else {
      if (displayed.length < 16) screen.textContent = displayed + key;
    }
    previousKey = 'number';
    return;
  }


  if (key === '.') {
    if (!displayed.includes('.')) {
      screen.textContent = displayed + '.';
    } else if (previousKey === 'operator' || previousKey === 'calculate') {
      screen.textContent = '0.';
    }
    previousKey = 'decimal';
    return;
  }


  if (['+', '−', '×', '÷'].includes(key)) {
    if (previousNum !== null && operator && previousKey !== 'operator' && previousKey !== null) {
      const result = calculate(previousNum, operator, displayed);
      addToHistory(`${previousNum} ${operator} ${displayed}`, result);
      screen.textContent = result;
      previousNum = result;
    } else {
      previousNum = displayed;
    }
    operator = key;
    previousKey = 'operator';
    return;
  }


  if (key === '=') {
    if (previousNum !== null && operator) {
      const result = calculate(previousNum, operator, displayed);
      addToHistory(`${previousNum} ${operator} ${displayed}`, result);
      screen.textContent = result;
      previousNum = null;
      operator = null;
      previousKey = 'calculate';
    }
    return;
  }


  if (key === 'C' || key === 'C/CE') {
    screen.textContent = '0';
    previousNum = null;
    operator = null;
    previousKey = null;
    return;
  }


  if (key === 'OFF') {
    screen.textContent = '';
    calculator.style.opacity = '0.6';
    return;
  }


  if (key === '√') {
    const val = parseFloat(displayed);
    if (!isNaN(val)) {
      const result = (val >= 0 ? Math.sqrt(val) : 'Error').toString();
      addToHistory(`√(${displayed})`, result);
      screen.textContent = result;
      previousKey = 'calculate';
    }
    return;
  }


  if (key === '%') {
    const val = parseFloat(displayed);
    if (!isNaN(val)) {
      const result = (val / 100).toString();
      addToHistory(`${displayed}%`, result);
      screen.textContent = result;
      previousKey = 'calculate';
    }
    return;
  }


  if (key === 'MRC') {
    screen.textContent = memory.toString();
    previousKey = 'memory';
    return;
  }
  if (key === 'M-') {
    memory -= parseFloat(displayed) || 0;
    previousKey = 'memory';
    return;
  }
  if (key === 'M+') {
    memory += parseFloat(displayed) || 0;
    previousKey = 'memory';
    return;
  }
});
