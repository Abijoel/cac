const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let operator = '';
let previousInput = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        const operation = button.dataset.operation;
        const number = button.dataset.number;

        if (number) {
            if (currentInput === '0') {
                currentInput = number;
            } else {
                currentInput += number;
            }
            display.textContent = currentInput;
        } else if (operation) {
            if (currentInput) {
                operator = operation;
                previousInput = currentInput;
                currentInput = '';
            }
        } else if (value === '.') {
            if (!currentInput.includes('.')) {
                currentInput += '.';
                display.textContent = currentInput;
            }
        } else if (value === 'C') {
            currentInput = '';
            previousInput = '';
            operator = '';
            display.textContent = '0';
        } else if (value === '←') {
            currentInput = currentInput.slice(0, -1);
            display.textContent = currentInput || '0';
        } else if (value === '=') {
            if (operator && previousInput && currentInput) {
                currentInput = calculate(previousInput, currentInput, operator);
                display.textContent = currentInput;
                operator = '';
                previousInput = '';
            }
        }
    });
});

function calculate(a, b, operator) {
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);

    switch (operator) {
        case '+':
            return (num1 + num2).toString();
        case '-':
            return (num1 - num2).toString();
        case '*':
            return (num1 * num2).toString();
        case '/':
            return (num1 / num2).toString();
        default:
            return '0';
    }
}
