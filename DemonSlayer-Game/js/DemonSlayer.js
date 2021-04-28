const startScreen = document.querySelector("#startScreen")
const startButton = document.querySelector("#startGame")
const charScreen = document.querySelector("#charSelect")
const tanjiroBut = document.querySelector("#Tanjiro")
const zenitsuBut = document.querySelector("#Zenitsu")
const inoskueBut = document.querySelector("#Inosuke")
const gameScreen = document.querySelector("#gameWrapper")

startButton.addEventListener("click", () => {
    startScreen.classList.toggle("hide")
    charScreen.classList.toggle("hide")
})

let chosenChar;
function pickCharcter(picked) {
    chosenChar = picked;
    startGame();
}

tanjiroBut.addEventListener("click", () => {
    pickCharcter(tanjiro);
    charScreen.classList.toggle("hide");
    gameScreen.classList.toggle("hide");
})

zenitsuBut.addEventListener("click", () => {
    pickCharcter(zenitsu);
    charScreen.classList.toggle("hide");
    gameScreen.classList.toggle("hide");
})

inoskueBut.addEventListener("click", () =>{
    pickCharcter(inosuke);
    charScreen.classList.toggle("hide");
    gameScreen.classList.toggle("hide");
})


function populateInfoBox(text) {
    infoBox.innerText = text
}


const openingQ = document.getElementById('openingQuestion')
const allButtons = document.querySelectorAll(".submit")

for (i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener("click", opener.submitQuestion)
}


function startGame() {
    populateInfoBox((`Oh no, ${chosenChar.name} has encountered a blood starved Demon! Prepare yourself!`))
    console.log(tanjiro)
    chosenChar.startAnimation("idle")
    chosenChar.playAnimation()
    demonGuy.startAnimation("idle")
    demonGuy.playAnimation()
    opener.question(startGameOptions)
    slayerHealthbar.innerText = chosenChar.health + "HP";
    money.innerText = `$${chosenChar.money}`
    demonHealthbar.innerText = demonGuy.health + "HP";
}

function runOption() {
    const run = (Math.floor(Math.random() * 100))
    if (run >= 50) {
        populateInfoBox("You got away! Death before dishonor, get back in there")
        opener.question(runOptions)
    } else if ((run) < 50) {
        populateInfoBox("You failed to get away")
        chosenChar.startAnimation("idle")
        chosenChar.playAnimation()
        setTimeout(demonAttack, 1500)
    }
}

function defendOption() {
    populateInfoBox(`${chosenChar.name} defended the attack`)
    chosenChar.defending = true
    setTimeout(demonAttack, 1500)
    chosenChar.defennding = false
}

function shop() {
    populateInfoBox("Potion: Heal 100HP \n Antidote: Remove Status Effect \n Super Potion: Heal 250HP \n Ether: Heal All HP")
    opener.question(shopOptions)
}

function demonSlayerAttack() {
    chosenChar.whichAttack((attack) => {
        let damageNum = chosenChar.attacks[attack].damage
        if (chosenChar.attacks[attack].missChance >= Math.random() * 100) {
            demonGuy.bleed = false;
            populateInfoBox("attack missed");
            opener.question(startGameOptions);
        } else {
            let crit = false;
            if (attack == "striking tide" && (Math.round(Math.random() * 100)) < chosenChar.attacks["striking tide"].critChance) {
                crit = true;
                damageNum *= 8;
            }
            demonGuy.changeHealth(damageNum)
            populateInfoBox(`${attack} has landed for ${damageNum} demon's health is now ${demonGuy.health} ${crit ? "Critical Strike!" : ""}`)
            opener.question(startGameOptions)
        }
        if (chosenChar.posion == true) {
            chosenChar.changeHealth(10);
            chosenChar.posionedRounds--;
            if (chosenChar.posionedRounds == 0) {
                chosenChar.posion = false;
            }
        }
        if (chosenChar.curse == true) {
            chosenChar.curseRounds--;
            if (chosenChar.curseRounds == 0) {
                chosenChar.health = 0;
            }
        }
        if (demonGuy.health <= 0) {
            demonGuy.addMoney()
            opener.question(endFightOptions);
        }
        else setTimeout(demonAttack, 1500)
    })
}

function demonAttack() {
    let testdamge = demonGuy.dealDamage()
    if (chosenChar.defending === true) {
        testdamge = Math.round((testdamge * chosenChar.defense) / 100)
    }
    if (demonGuy.bleed == true) {
        demonGuy.changeHealth(5);
        demonGuy.bleedRounds--;
        if (demonGuy.bleedRounds == 0) {
            demonGuy.bleed = false;
        }
    }
    if (demonGuy.extraAbility == "poison") {
        if (chosenChar.poison == false && Math.random() <= .15) {
            chosenChar.poison = true;
            chosenChar.poisonedRounds = 6
            populateInfoBox(`${chosenChar.name} has been poisoned for 5 turns`)
        }
    }
    if (demonGuy.extraAbility == "curse") {
        if (chosenChar.curse == false && Math.random() <= .40) {
            chosenChar.curse = true;
            chosenChar.curseRounds = 4
            populateInfoBox(`${chosenChar.name} has been cursed! If he does not kill the enemy or use an item that removes status effects, he will die in 3 turns`)
        }
    }
    chosenChar.changeHealth(testdamge)
    populateInfoBox(`${demonGuy.name}'s dark claw has landed for ${testdamge} ${chosenChar.name}'s health is now, ${chosenChar.health} ${demonGuy.bleed ? `\n${demonGuy.name} has bleed for 5dmg` : ""} ${chosenChar.poison ? ` \n${chosenChar.name} took 10dmg from the poison` : ""} ${chosenChar.curse ? `\n${chosenChar.name} is cursed, better fix that` : ""}`)
    opener.question(startGameOptions)
    if (chosenChar.health <= 0) {
        populateInfoBox(chosenChar.name + "has fainted, you lose");
        opener.question("will you play again?", myInput => {
            if (myInput == "yes") {
                setTimeout(startGame, 1500)
            }
            else opener.close()
        })
    }
}

function printMousePos(event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
}

canvas.addEventListener("click", printMousePos);

