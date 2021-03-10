/*
    We are going to build a mini-game that will play out automatically as soon as we run the program.

    What is the game?
        - A good guy vs a bad guy, rpg style battle. "What!?", you might be asking. Ok, lets name this game
            "Demon Slayer", if you will.

    (Note: You can use this clip to get a better concept of what you're trying to have happen between your Demon Slayer &
        demon -> https://youtu.be/vHp0cFUB5as?t=61 
        Definitely don't watch the whole thing.)
    
    What does the program look like?
        - You'll simulate a battle between your Demon Slayer and a demon.
        - You'll run the program and the battle will play out in the terminal.
        - The Demon Slayer and the demon will take turns attacking one another. 
            The stats will be shown after each attack.
        - The demon attacks should have a random damage value, but the Demon Slayer should have a consistent
            attack value. 
        - As soon as either the Demon Slayer or the demon hitpoints reaches 0, the other wins the battle.
        - Use console.log() to show each attack, how many hitpoints either character loses, and the updated stats
            for the demon and demonslayer - also be sure to log the winner.
        - Think about when and where you might want to use a loop...
        - Maybe you want to create an object to keep track of other data that isn't about either character...? Hmmm...
        - I'm leaving the execution of this program a little bit more open ended than our previous mini-projects.

    What's the idea here? Why are we doing this?
        - We want to get a sense of how we can create objects and have them interact. Something to keep in mind is that
            when creating objects you are modeling things - think of our car exercise. The character you're modeling
            will have properties and methods (things they can do).
        

    To do this efficiently you should probably create some sort of plan beforehand. "Timewise, programming is 75–90% 
    planning and 10–25% actually typing code."
*/
console.log("Oh no, DeamonSlayer has encountered a wild Demon")
const demonSlayer = {
    health: 100,
    damage: 15,
}

const demonGuy = {
    health: 100,
    dealDamage: function() { this.damage = Math.round(Math.random() * 100)
        return this.damage
    },
    damage: Math.round(Math.random() * 100)
}


//Pick who goes first
const opener = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

function startGame() {
    opener.question("Will you attack, wait, or try to run away?", myInput => {
        if (myInput == "attack") {
            demonSlayerAttack()
        } else if (myInput == "wait") {
            demonAttack()
        } else if (myInput == "run") {
            runOption()
        }
    })
}
function runOption(params) {
const run = (Math.floor( Math.random()*100))
if ((run) >= 50){
    console.log("You succesfully ran away")
    opener.question("will you play again?", myInput => {
        if (myInput == "yes") {
            startGame()
        }
        else opener.close()
    })
} if ((run) < 50){
    console.log("you failed to get away")
    startGame()
    }
}

startGame()
function demonSlayerAttack(attack, health) {
    demonGuy.health -= demonSlayer.damage
    console.log("second form water wheel has ladned for", demonSlayer.damage, "demon's health is now", demonGuy.health)
    if (demonGuy.health <= 0) {
        console.log("The Demon has been slain, you win!");
        opener.question("will you play again?", myInput => {
            if (myInput == "yes") {
                startGame()
            }
            else opener.close()
        })
    }
    else (demonAttack())
}

function demonAttack(attack, health) {
    demonSlayer.health -= demonGuy.dealDamage()
    console.log("Demon's dark claw has landed for,", demonGuy.damage, "demonslayer's health is now", (demonSlayer.health))
    if (demonSlayer.health <= 0) {
        console.log("The DemonSlayer has fainted, you lose");
        opener.question("will you play again?", myInput => {
            if (myInput == "yes") {
                startGame()
            }
            else opener.close()
            //opener.close will close out the program when it dosent have a yes value enterned 
        })
}
    else (demonSlayerAttack())
}

