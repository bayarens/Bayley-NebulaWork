function populateInfoBox(text) {
    infoBox.innerText = text
}
function draw() {
}
slayerHealthbar.innerText = tanjiro.health + "HP";
const demonGuy = {
    health: 100,
    dealDamage: function () {
        this.damage = Math.round(Math.random() * 100)
        return this.damage
    },
    damage: Math.round(Math.random() * 100)
}

const openingQ = document.getElementById('openingQuestion')
const allButtons = document.querySelectorAll(".submit")

for (i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener("click", opener.submitQuestion)
}
demonHealthbar.innerText = demonGuy.health + "HP";

function startGame() {
    populateInfoBox((`Oh no, ${tanjiro.name} has encountered a blood starved Demon! Prepare yourself!`))
    console.log(tanjiro)
    tanjiro.startAnimation("idle")
    tanjiro.playAnimation()
    opener.question(startGameOptions)
}

function runOption() {
    const run = (Math.floor(Math.random() * 100))
    if (run >= 50) {
        populateInfoBox("You got away! Death before dishonor, kill yourself")
    }   else if ((run) < 50) {
        populateInfoBox("You failed to get away")
        tanjiro.startAnimation("idle")
        tanjiro.playAnimation()
        setTimeout(demonAttack, 1500)
    }
}

function defendOption(){
    populateInfoBox(`${tanjiro.name} defended the attack`)
    console.log(dealDamage())
    demonAttack()
    //demonGuy.dealDamage() -= tanjiro.defense
    //console.log(demonGuy.dealDamage)
}

function shop(){
    populateInfoBox("Potion: Heal 100HP \n Antidote: Remove Status Effect \n Super Potion: Heal 250HP \n Ether: Heal All HP")
    opener.question("what will you buy?", [`Potion $${potion.cost}`, `Antidote $${antidote.cost}` , `Super Potion $${superPotion.cost}`, `Ether $${ether.cost}`], myInput => {
        if(myInput == "Potion") {
            populateInfoBox(`${tanjiro.name} Healed for 100HP`)
        }
        if (myInput == "Antidote") {
            populateInfoBox(`${tanjiro.name} Removed Status Effect`)
        }
        if (myInput == "Super Potion") {
            populateInfoBox(`${tanjiro.name} Healed for 250HP`)
        }
        if (myInput == "Ether") {
            populateInfoBox(`${tanjiro.name}  Healed all HP`)
        }
    })
}

function demonSlayerAttack() {
    tanjiro.whichAttack((attack) => {
        let damageNum = tanjiro.attacks[attack].damage
        if (tanjiro.attacks[attack].missChance >= Math.random() * 100) {
            populateInfoBox("attack missed")
            opener.question(startGameOptions)
        } else {
            demonGuy.health -= damageNum
            demonHealthbar.innerText = demonGuy.health + "HP";
            populateInfoBox(`${attack} has landed for ${damageNum} demon's health is now ${demonGuy.health}`)
            opener.question(startGameOptions)
        }
        if (demonGuy.health <= 0) {
            populateInfoBox("The Demon has been slain, you win!");
            opener.question(endGameOptions)
        }
        else setTimeout(demonAttack, 1500)
    })
}

function demonAttack() {
    tanjiro.health -= demonGuy.dealDamage()
    slayerHealthbar.innerText = tanjiro.health + "HP";
    populateInfoBox(`Demon's dark claw has landed for ${demonGuy.damage} ${tanjiro.name}'s health is now, ${tanjiro.health}`)
    opener.question(startGameOptions)
    if (tanjiro.health <= 0) {
        populateInfoBox(demonSlayer.name + "has fainted, you lose");
        opener.question("will you play again?", myInput => {
            if (myInput == "yes") {
                setTimeout(startGame, 1500)
            }
            else opener.close() 
        })
    }
}

startGame()

// function printMousePos(event) {
//     const rect = canvas.getBoundingClientRect()
//     const x = event.clientX - rect.left
//     const y = event.clientY - rect.top
//     console.log("x: " + x + " y: " + y)
// }

// canvas.addEventListener("click", printMousePos);

