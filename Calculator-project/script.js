const displayBox = document.querySelector("#display-box input")

const populateDisplayBox = (button) => {
//console.log(button.innerText)
displayBox.value += button.innerText
}

const numKeys = document.querySelectorAll("button.num")

const operKeys = document.querySelectorAll("button.opp")

const clearKey = document.querySelector("#clear")

console.log(numKeys)
numKeys.forEach (numKey => numKey.addEventListener("click", () => populateDisplayBox(numKey)));

clearKey.addEventListener("click", () => displayBox.value = "")
