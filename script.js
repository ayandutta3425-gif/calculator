const display = document.getElementById('display');

function appendValue(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    // Replace % with /100 for percentage handling
    const expression = display.value.replace(/%/g, '/100');
    const result = evaluateExpression(expression);
    display.value = result;
  } catch (error) {
    display.value = 'Error';
  }
}

// Safe expression evaluator (avoids using eval directly)
function evaluateExpression(expr) {
  const sanitized = expr.replace(/[^0-9+\-*/.() ]/g, '');
  if (sanitized !== expr) {
    throw new Error('Invalid characters');
  }
  return Function('"use strict"; return (' + sanitized + ')')();
}

// Allow keyboard input
document.addEventListener('keydown', (e) => {
  if (/[0-9+\-*/.]/.test(e.key)) {
    appendValue(e.key);
  } else if (e.key === 'Enter') {
    e.preventDefault();
    calculate();
  } else if (e.key === 'Backspace') {
    deleteLast();
  } else if (e.key === 'Escape') {
    clearDisplay();
  }
});
