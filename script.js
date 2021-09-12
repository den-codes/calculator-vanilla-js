class Calculator {
    constructor(previousOperandText, currentOperandText){
        this.previousOperandText = previousOperandText
        this.currentOperandText = currentOperandText
        this.clear()
    }
    clear(){ /*clears different values */
        this.currentOperand = ''
        this.previousOperand =''
        this.operation = undefined
    }
    delete(){ /*removes a number*/
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }
    appendNumber(number) { /*adds a number to the screen*/
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation (operation){
        if(this.currentOperand === '') return
        if(this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    compute(){
        let computation // result 
        const prev = parseFloat(this.previousOperand) //convert to number
        const current = parseFloat(this.currentOperand)

        if(isNaN(prev) || isNaN(current)) return

        switch (this.operation) {
            case '+': 
            computation = prev + current
            break
            case 'x': 
            computation = prev * current
            break
            case '-': 
            computation = prev - current
            break
            case '/': 
            computation = prev / current
            default: 
            return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerNums = parseFloat(stringNumber.split('.')[0])
        const decimalNums = stringNumber.split('.')[1]

       let integerDisplay = ''
        if(isNaN(integerNums)) {
        integerDisplay = ''
     }else{
         integerDisplay = integerNums.toLocaleString('en', {
             maximumFractionDigits: 0
         })
     } 
     if (decimalNums != null){
         return `${integerNums}.${decimalNums}`
     }else{
         return integerDisplay
     }
    }
    updateDisplay() {
        this.currentOperandText.innerText = 
        this.getDisplayNumber(this.currentOperand)
        if(this.operation != null){
        this.previousOperandText.innerText = `${this.getDisplayNumber(this.previousOperand)}${this.operation}`
    } else {
        this.previousOperandText.innerText = ''
    }
    }
}
const numButtons = document.querySelectorAll('[data-number]'),
operationButtons = document.querySelectorAll('[data-operation]'),
equalButton = document.querySelector('[data-equal]'),
deleteButton = document.querySelector('[data-delete]'),
resetButton = document.querySelector('[data-reset]'), 
previousOperandText = document.querySelector('[data-previous-operand]'),
currentOperandText = document.querySelector('[data-current-operand]')
switches = document.getElementsByClassName('switch')

for (let i of switches) {
    i.addEventListener('click', function () {
      let theme = this.dataset.theme;
    });
  }

  function setTheme(theme) {
    if (theme == 'pink') {
      document.getElementById('switcher-id').href = './themes/pink.css';
    } else if (theme == 'purple') {
      document.getElementById('switcher-id').href = './themes/purple.css';
    } else if (theme == 'dark') {
        document.getElementById('switcher-id').href = './themes/dark.css';
    }
  }

  for (let i of switches) {

  i.addEventListener('click', function () {

    let theme = this.dataset.theme;

    console.log(theme);

    setTheme(theme);

  });

}
const calculator = new Calculator( previousOperandText, currentOperandText)
numButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})
resetButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
