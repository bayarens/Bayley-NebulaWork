const displayBox = document.querySelector("#display-box input")

const displayBoxHolder = document.querySelector("#display-box-holder input")

const hideButton = document.querySelector("#hide-button")

const calculator = document.querySelector("#calculator-frame")

hideButton.addEventListener("click", onToggleHideClick)

function onToggleHideClick(e){
    calculator.classList.toggle('hide');
    e.target.innerText = calculator.classList.contains('hide') ? 'Show' : 'Hide'
}

let operator = ""

const operators = {
    "+": () => +displayBoxHolder.value + +displayBox.value,
    "-": () => displayBoxHolder.value - displayBox.value,
    "*": () => displayBoxHolder.value * displayBox.value,
    "/": () => displayBoxHolder.value / displayBox.value,
    "^": () => displayBoxHolder.value ** displayBox.value,
}

const populateDisplayBox = (button) => {
    displayBox.value += button.innerText
    clearKey.innerText = "C"
}

const populateDisplayBoxHolder = (button) => {
    displayBoxHolder.value = displayBox.value
    displayBox.value = ""
    operator = button.innerText
    button.classList.toggle("active")
    if(activeButton){
        activeButton.classList.toggle("active")
    }
    activeButton = button
}

let activeButton 

const calculate = () => {
    if(!operator){
        return
    }
    displayBox.value = operators[operator]()
    displayBoxHolder.value = ""
    activeButton.classList.remove("active")
    activeButton = null
    operator = null
}

const numKeys = document.querySelectorAll("button.num")

const operKeys = document.querySelectorAll("button.opp")

const clearKey = document.querySelector("#clear")

const equalKey = document.querySelector("#equal")

console.log(numKeys)
numKeys.forEach(numKey => numKey.addEventListener("click", () => populateDisplayBox(numKey)));


function clear() {
    if (displayBox.value) {
        displayBox.value = ""
    } else {
        displayBoxHolder.value = ""
    }
    clearKey.innerText = "A/C"
    if(activeButton){
        activeButton.classList.remove("active")
    }
    activeButton = null
    operator = null
}

clearKey.addEventListener("click", clear)

// want to write code that says, after I hit an opperator key, whatever was in the display box should be pushed to the display box holder and then 
console.log(operKeys)
operKeys.forEach(operKey => operKey.addEventListener("click", () => populateDisplayBoxHolder(operKey)));


// want to write code that will take what I have in the display box and do whatever opperation was chose to the display box holder with the content in display box being a paramater

//equalKey.addEventListener("click", () => displayBox  operate  displayBoxHolder => populate display box

equalKey.addEventListener("click", () => calculate())


