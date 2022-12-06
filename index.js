
/*================================ Element-Selection ====================================================*/

// querySelectorAll
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');

//querySelector
const previousOperandDisplay = document.querySelector('.previous-operand');
const currentOperandDisplay = document.querySelector('.current-operand');

const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');


/*=======================================================================================================*/ 

/*-------------------------------- Variable-Initialisation -----------------------------*/


let currentOperand = "",
previousOperand = "",
operation;



/*------------------------------- Clear-Function ------------------------------*/ 


function clear() {
    currentOperand = "",
    previousOperand = "",
    operation = undefined;
}    


/*------------------------------- Delete-Last-Char-Function ------------------------------*/ 


function deleteLastChar() {
    currentOperand = currentOperand.toString().slice(0,-1);
}


/*========================================= Append-Number-Function ===========================================*/


function appendNumber(number) {
    if (number === "." && currentOperand.includes(".")) return;
    if (number === Math.E || number === Math.PI) currentOperand = "";
    if (currentOperand.includes(Math.E) || currentOperand.includes(Math.PI)) currentOperand = "";

    currentOperand = currentOperand.toString() + number.toString();
}


/*========================================= Choose-Operation-Function ===========================================*/


function chooseOperation(newOperation) {
    if (currentOperand === "") return;
    
    if (previousOperand !== ""){
        compute();
    }

    operation = newOperation;
    previousOperand = currentOperand;
    currentOperand = "";
}


/*========================================= Compute-Function ===========================================*/


function compute() {
    let computation;
    const previous = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    // if (isNaN(previous) || isNaN(current)) return;

    switch (operation) {
        case "÷":
            computation = previous / current;
            break;
        case "×":
            computation = previous * current;
            break;
        case "*":
            computation = previous * current;
            break;
        case "+":
            computation = previous + current;
            break;
        case "-":
            computation = previous - current;
            break;
        case "^":
            computation = previous ** current;
            break;
        case "%":
            computation = previous * 100;
            break;
        case "√":
            computation = Math.sqrt(previous);
            break;
        case "x²":
            computation = previous ** 2;
            break;
        case "1/x":
            computation = 1 / previous;
            break;
        case "x!":
            computation = factorial(previous);
            break;
        case "log":
            computation = Math.log10(previous);
            break;
        case "ln":
            computation = Math.log(previous);
            break;
        case "mod":
            computation = previous % current;
            break;
        case "Exp":
            computation = previous * (10 ** current);
            break;
        case "sin":
            computation = Math.sin(previous);
            break;
        case "cos":
            computation = Math.cos(previous);
            break;
        case "tan":
            computation = Math.tan(previous);
            break;
        default:
            return;  
    }

    currentOperand = computation;
    operation = undefined;
    previousOperand = "";
}


/*------------------------------------------ Get-Display-Number ------------------------------------*/


function getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;

    if (isNaN(integerDigits)){
        integerDisplay = "";
    }
    else{
        integerDisplay = integerDigits.toLocaleString("en-IN");
    }

    if (decimalDigits != null){
        return `${integerDisplay}.${decimalDigits}`;
    }
    else {
        return integerDisplay;
    }

}


/*------------------------------------------ Update-Display ------------------------------------*/


function updateDisplay() {
    currentOperandDisplay.innerText = getDisplayNumber(currentOperand);

    if (operation != null){
        previousOperandDisplay.innerText = `${getDisplayNumber(previousOperand)} ${operation}`;
    }
    else{
        previousOperandDisplay.innerText = "";
    }
}



/*------------------------------- Operand- Buttons ----------------------------*/


numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.innerText === "π"){
            appendNumber(Math.PI);
            updateDisplay();
            return;
        }
        if (button.innerText === "e"){
            appendNumber(Math.E);
            updateDisplay();
            return;
        }
        appendNumber(button.innerText);
        updateDisplay();
    });
})


/*------------------------------- Operation- Buttons ----------------------------*/


operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.innerText === "-" && currentOperand === ""){
            currentOperandDisplay.innerText = "-";
            appendNumber("-");
            return;
        }

        chooseOperation(button.innerText);
        updateDisplay();
    });
})


/*-------------- Equals-To - Button ----------------------*/

equalsButton.addEventListener("click", () => {
    compute();
    updateDisplay();
    currentOperand = "";
})


/*-------------- AC- Button ----------------------*/

allClearButton.addEventListener("click", () => {
    clear();
    updateDisplay();
})


/*-------------- DEL- Button ----------------------*/

deleteButton.addEventListener("click", () => {
    deleteLastChar();
    updateDisplay();
})



/*=========================== KeyBoard-Handling ========================================================================================*/ 


document.addEventListener('keydown',(event) => {
    // console.log(event);
    const key = event.key;
    
    if(key === 'Backspace'){deleteChar()};
    if(key === 'Delete'){clear()};
  
    if(key === '=' || key === 'Enter'){compute(),updateDisplay(),currentOperand = ""; return};
  
    if(key === '-' && currentOperand === ""){
        currentOperandDisplay.innerText = "-";
        appendNumber("-");
        return;
    }
  
    if(key === '*' || key === '+' || key === '-' || key === '%'){chooseOperation(key)};
    if(key === '/'){chooseOperation('÷')};
  
    if(key === '.' || key === '0' || key === '1' || key === '2' || key === '3' || key === '4' || 
    key === '5' || key === '6' || key === '7' || key === '8' || key === '9'){appendNumber(key)};
  
    updateDisplay();
  
  })







  /*=========================== Special Functions ========================================================================================*/

  /*-------------- Factorial of a Number ----------------------*/ 

  function factorial(num) {
    if(num == 0)return 1;
    return num *= factorial(num-1);
  }