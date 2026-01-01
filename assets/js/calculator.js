// Calculator App JavaScript

class Calculator {
  constructor(previousDisplayElement, currentDisplayElement) {
    this.previousDisplayElement = previousDisplayElement;
    this.currentDisplayElement = currentDisplayElement;
    this.clear();
  }

  clear() {
    this.currentOperand = '0';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    if (this.currentOperand === '0') return;
    if (this.currentOperand.length === 1) {
      this.currentOperand = '0';
    } else {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    if (this.currentOperand === '0' && number !== '.') {
      this.currentOperand = number.toString();
    } else {
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '0';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '−':
        computation = prev - current;
        break;
      case '×':
        computation = prev * current;
        break;
      case '÷':
        if (current === 0) {
          alert('Cannot divide by zero');
          this.clear();
          this.updateDisplay();
          return;
        }
        computation = prev / current;
        break;
      default:
        return;
    }
    
    this.currentOperand = computation.toString();
    this.operation = undefined;
    this.previousOperand = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0
      });
    }
    
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentDisplayElement.textContent = this.getDisplayNumber(this.currentOperand);
    
    if (this.operation != null) {
      this.previousDisplayElement.textContent = 
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      this.previousDisplayElement.textContent = '';
    }
  }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Wait a bit to ensure all elements are loaded
  setTimeout(function() {
    const previousDisplayElement = document.querySelector('.calculator__display-previous');
    const currentDisplayElement = document.querySelector('.calculator__display-current');
    
    if (!previousDisplayElement || !currentDisplayElement) {
      console.log('Calculator elements not found yet');
      return;
    }

    const calculator = new Calculator(previousDisplayElement, currentDisplayElement);

    const numberButtons = document.querySelectorAll('[data-number]');
    const operationButtons = document.querySelectorAll('[data-action="add"], [data-action="subtract"], [data-action="multiply"], [data-action="divide"]');
    const equalsButton = document.querySelector('[data-action="equals"]');
    const deleteButton = document.querySelector('[data-action="delete"]');
    const clearButton = document.querySelector('[data-action="clear"]');
    const decimalButton = document.querySelector('[data-action="decimal"]');

    numberButtons.forEach(button => {
      button.addEventListener('click', () => {
        calculator.appendNumber(button.dataset.number);
        calculator.updateDisplay();
      });
    });

    operationButtons.forEach(button => {
      button.addEventListener('click', () => {
        const action = button.dataset.action;
        let operation;
        switch(action) {
          case 'add':
            operation = '+';
            break;
          case 'subtract':
            operation = '−';
            break;
          case 'multiply':
            operation = '×';
            break;
          case 'divide':
            operation = '÷';
            break;
        }
        calculator.chooseOperation(operation);
        calculator.updateDisplay();
      });
    });

    if (equalsButton) {
      equalsButton.addEventListener('click', () => {
        calculator.compute();
        calculator.updateDisplay();
      });
    }

    if (deleteButton) {
      deleteButton.addEventListener('click', () => {
        calculator.delete();
        calculator.updateDisplay();
      });
    }

    if (clearButton) {
      clearButton.addEventListener('click', () => {
        calculator.clear();
        calculator.updateDisplay();
      });
    }

    if (decimalButton) {
      decimalButton.addEventListener('click', () => {
        calculator.appendNumber('.');
        calculator.updateDisplay();
      });
    }

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      // Only handle keyboard input when calculator section is active
      const calculatorSection = document.querySelector('.calculator-app').closest('.section');
      if (!calculatorSection || !calculatorSection.classList.contains('section--is-active')) {
        return;
      }

      if (e.key >= '0' && e.key <= '9') {
        calculator.appendNumber(e.key);
        calculator.updateDisplay();
      }
      if (e.key === '.') {
        calculator.appendNumber('.');
        calculator.updateDisplay();
      }
      if (e.key === '=' || e.key === 'Enter') {
        calculator.compute();
        calculator.updateDisplay();
      }
      if (e.key === 'Backspace') {
        calculator.delete();
        calculator.updateDisplay();
      }
      if (e.key === 'Escape') {
        calculator.clear();
        calculator.updateDisplay();
      }
      if (e.key === '+') {
        calculator.chooseOperation('+');
        calculator.updateDisplay();
      }
      if (e.key === '-') {
        calculator.chooseOperation('−');
        calculator.updateDisplay();
      }
      if (e.key === '*') {
        calculator.chooseOperation('×');
        calculator.updateDisplay();
      }
      if (e.key === '/') {
        e.preventDefault();
        calculator.chooseOperation('÷');
        calculator.updateDisplay();
      }
    });

    console.log('Calculator initialized successfully');
  }, 500);
});
