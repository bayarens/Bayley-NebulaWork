/*
Rock Paper Scissors (using functions, conditionals, Math, variables, data type)
    Player VS Computer

        Possible outcomes:
            - Rock smashes Scissors
            - Scissors cuts Paper
            - Paper covers Rock
            - There could also be a tie
        
        How should we break up our program?
            - Get the users choice
            - Get the computers choice
            - Compare the two choices and find out who won
            - Start the game and console.log the choices made & the winner

        Possible functions:
            getUserChoice();
            getComputerChoice();
            determineWinner();
            playGame();
            
*/ 


//Users choice
const Uchoice = require('readline').createInterface({
input: process.stdin,
output: process.stdout
})
Uchoice.question("Rock, Paper, or Scissors?",myInput => {
    Winner(myInput,CompChoice(getRandomNumber()))
})


//Computer Choice
function getRandomNumber() {
return Math.floor(Math.random()*3 +1)
}

function CompChoice(randomNumber) {
    if (randomNumber === 1) {
        return "Rock"
    } else if (randomNumber === 2) {
        return "Paper"
    } else if (randomNumber === 3) {
        return "Scissor"
    }
}
// console.log(CompChoice(getRandomNumber()),"<--get random choice here") 

//Determine Winner
function Winner(myInput,compInput) {
    console.log("The computer chose",compInput)
    if (myInput === compInput) {
        console.log("It's a tie")
    } else if (myInput == "Rock" && compInput == "Paper") {
        console.log("You Lose!")
    } else if (myInput == "Rock" && compInput == "Scissor") {
        console.log("You Win!!!")
    } else if (myInput == "Paper" && compInput == "Rock") {
        console.log("You Win!!!")
    } else if (myInput == "Paper" && compInput == "Scissor") {
        console.log("You Lose!")
    }else if (myInput == "Scissor" && compInput == "Rock") {
        console.log("You Lose!")
    }else if (myInput == "Scissor" && compInput == "Paper") {
        console.log("You Win!!!")
    } 
    Uchoice.close() 
} 