const userInput = document.getElementById('user-input');
const buttons = document.querySelectorAll('button');

// Initialize the state of the calculator
let currentInput = '0'; // The current input shown in the display
let result = null;       // The result of the calculation
let lastOperator = null; // To store the last operator pressed

// Function to update the display
function updateDisplay(value) {
    userInput.textContent = value;
}

// Handle button clicks
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.textContent;

        if (value === 'AC') {
            // Reset calculator when 'AC' is pressed
            currentInput = '0';
            result = null;
            lastOperator = null;
            updateDisplay(currentInput);
        } else if (value === 'DEL') {
            // Delete last character when 'DEL' is pressed
            if (currentInput.length > 1) {
                currentInput = currentInput.slice(0, -1);
            } else {
                currentInput = '0';
            }
            updateDisplay(currentInput);
        } else if (value === '=') {
            // Evaluate the expression when '=' is pressed
            try {
                result = eval(currentInput); // Using eval to evaluate the expression
                updateDisplay(result);
                currentInput = result.toString(); // Set result as current input for further operations
            } catch (error) {
                updateDisplay("Error");
                currentInput = '0'; // Reset after error
            }
        } else if (['+', '-', '*', '/', '%'].includes(value)) {
            // Handle operators
            if (currentInput === '0') return; // Do nothing if input is empty
            if (lastOperator) {
                // Prevent multiple operators in a row
                currentInput = currentInput.slice(0, -1);
            }
            currentInput += value;
            updateDisplay(currentInput);
            lastOperator = value; // Store the operator
        } else {
            // Handle numbers and decimal point
            if (currentInput === '0') {
                currentInput = value; // Replace '0' with the first digit
            } else {
                currentInput += value; // Append the digit or decimal
            }
            updateDisplay(currentInput);
        }
    });
});
