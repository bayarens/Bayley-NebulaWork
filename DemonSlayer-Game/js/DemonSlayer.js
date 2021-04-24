function populateInfoBox(text) {
    infoBox.innerText = text
}
function draw() {
}
slayerHealthbar.innerText = tanjiro.health + "HP";

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
        populateInfoBox("You got away! Death before dishonor, get back in there")
        opener.question(runOptions)
    }   else if ((run) < 50) {
        populateInfoBox("You failed to get away")
        tanjiro.startAnimation("idle")
        tanjiro.playAnimation()
        setTimeout(demonAttack, 1500)
    }
}

function defendOption(){
    populateInfoBox(`${tanjiro.name} defended the attack`)
    tanjiro.defending = true
    setTimeout(demonAttack, 1500)
    tanjiro.defennding = false
}

function shop(){
    populateInfoBox("Potion: Heal 100HP \n Antidote: Remove Status Effect \n Super Potion: Heal 250HP \n Ether: Heal All HP")
    opener.question(shopOptions)
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
    let testdamge = demonGuy.dealDamage()
    if (tanjiro.defending === true){
        testdamge = Math.round((testdamge * tanjiro.defense) /100) 
    } 
    tanjiro.health -= testdamge
    slayerHealthbar.innerText = tanjiro.health + "HP";
    populateInfoBox(`Demon's dark claw has landed for ${testdamge} ${tanjiro.name}'s health is now, ${tanjiro.health}`)
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

