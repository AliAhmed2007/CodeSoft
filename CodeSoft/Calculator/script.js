let display = document.getElementById('display');
let buttons = document.querySelectorAll('button');

let calculator = {
    displayValue: '0',
    firstOperand: '',
    operator: '',
    secondOperand: '',

    handleButtonPress: function(event) {
        let buttonValue = event.target.value;

        if (buttonValue === 'C') {
            this.clear();
        } else if (buttonValue === '=') {
            this.calculate();
        } else if (buttonValue === '+' || buttonValue === '-' || buttonValue === '*' || buttonValue === '/') {
            this.setOperator(buttonValue);
        } else if (buttonValue === '%') {
            this.percent();
        } else if (buttonValue === '+/-') {
            this.negate();
        } else {
            this.appendNumber(buttonValue);
        }

        display.value = this.displayValue;
    },

    appendNumber: function(number) {
        if (this.displayValue === '0') {
            this.displayValue = number;
        } else {
            this.displayValue += number;
        }
    },

    setOperator: function(operator) {
        this.firstOperand = this.displayValue;
        this.operator = operator;
        this.displayValue += operator;
    },

    calculate: function() {
        this.secondOperand = this.displayValue.slice(this.firstOperand.length + 1);
        let result = 0;

        switch (this.operator) {
            case '+':
                result = parseFloat(this.firstOperand) + parseFloat(this.secondOperand);
                break;
            case '-':
                result = parseFloat(this.firstOperand) - parseFloat(this.secondOperand);
                break;
            case '*':
                result = parseFloat(this.firstOperand) * parseFloat(this.secondOperand);
                break;
            case '/':
                result = parseFloat(this.firstOperand) / parseFloat(this.secondOperand);
                break;
        }

        this.displayValue = result.toString();
    },

    clear: function() {
        this.displayValue = '0';
        this.firstOperand = '';
        this.operator = '';
        this.secondOperand = '';
    },

    percent: function() {
        this.displayValue = (parseFloat(this.displayValue) / 100).toString();
    },

    negate: function() {
        this.displayValue = (parseFloat(this.displayValue) * -1).toString();
    }
};

buttons.forEach(button => button.addEventListener('click', calculator.handleButtonPress.bind(calculator)));