const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');
const output = document.getElementById('output')
let imageLoader = document.querySelectorAll("#imageLoader img")
const slayerHealthbar = document.querySelector("#slayerHealthBar")
const demonHealthbar = document.querySelector("#demonHealthBar")



function draw() {

}

class Player {
    constructor(health) {
        this.health = health;
        this.money = 0;
    }
    whichAttack = function (f) {
        opener.question("Which attack will you use?", ["Water Wheel", "Twisting Whirlpool", "Striking Tide", "Constant Flux"] ,attack => f(attack))
    }
    attacks = {
        "Water Wheel": { damage: 50, missChance: 30, /*bleedValue: 5*/ },
        "Twisting Whirlpool": { damage: 20, missChance: 10, /*healValue: 20*/ },
        "Striking Tide": { damage: 10, missChance: 2, /*critChance: 35*/ },
        "Constant Flux": { damage: 100, missChance: 80 },
    }
    x = 25
    y = 335
    draw = function () {
        ctx.clearRect(0, 0, 800, 500)
        ctx.drawImage(this.img, this.x, this.y)
    }
    imgQueue = []
    currentImg = 0

    startAnimation(animation) {
        if (animation == "idle") {
            this.imgQueue = imageLoader
            this.currentImg = 0
        }
    }
    playAnimation() {
        setTimeout(() => this.playAnimation(), 200)
        this.currentImg = (this.currentImg + 1) % this.imgQueue.length
        this.img = this.imgQueue[this.currentImg]
        this.draw()
    }
}


class Enemy {
    constructor(health, damageMin, damageMax, extraAbility = null) {
        this.health = health;
        this.damageMin = damageMin;
        this.damageMax = damageMax;
        this.extraAbility = extraAbility;
    }

    performExtraAbility() {
        if (this.extraAbility) {
            return this.extraAbility()
        } else {
            console.log("Enemy doesn't have an extra ability")
        }
    }

    dealDamage() {
        // Pick a random number between damageLower and damageHigher
        return Math.round(Math.random() * (this.damageMax - this.damageMin) + this.damageMin);
    }
}

class Shop {
    constructor(potion, antidote, superpotion, eather, cost) {
        this.potion = potion;
        this.antidote = antidote;
        this.superpotion = superpotion;
        this.eather = eather;
        this.cost = cost;
    }
}
const tanjiro = new Player(500) 
const demon = new Enemy(100, 20, 40)
const demonLvl2 = new Enemy(150, 30, 60)
const demonMiniB = new Enemy(300, 50, 80)
const demonBoss = new Enemy(500, 100, 200)

console.log("Oh no, DeamonSlayer has encountered a wild Demon")

slayerHealthbar.innerText = tanjiro.health + "HP";
const demonGuy = {
    health: 100,
    //want to add a curse function that will kill 3 or 5 moves after landing, in case the demon gets really unlucky and only roles like single didget values
    dealDamage: function () {
        this.damage = Math.round(Math.random() * 100)
        return this.damage
    },
    damage: Math.round(Math.random() * 100)
}



const openingQ = document.getElementById('openingQuestion')
const allButtons = document.querySelectorAll(".submit")

const opener = {
    question(outputQuestion, buttons, responseFunc) {
        output.innerText = outputQuestion;
        this.responseFunc = responseFunc;
        this.buttons = buttons;
        //i need to set all of the buttons to their corresponding 
        for(let i=0; i < buttons.length; i++){
            allButtons[i].innerText = buttons[i]
        }
    },
    submitQuestion(e) {
        console.log(e)
        opener.responseFunc(e.target.innerText.toLowerCase())
    },
}

for (i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener("click", opener.submitQuestion)
}
demonHealthbar.innerText = demonGuy.health + "HP";



function startGame() {
    console.log(tanjiro)
    tanjiro.startAnimation("idle")
    tanjiro.playAnimation()
    opener.question("What will you do slayer?", ["Attack", "Defend", "Run", "Shop"] ,myInput => {
        if (myInput == "attack") {
            demonSlayerAttack()
        } else if (myInput == "defend") {
            //want to add an option where wait will turn into defend and demonSlayer will reduce incoming damage by 20% or something
            demonAttack() //demonGuy.damage 
        } else if (myInput == "run") {
            runOption()
        } else if (myInput == "shop"){
            shop()
        } 
    })
}
function runOption() {
    const run = (Math.floor(Math.random() * 100))
    if ((run) >= 50) {
        console.log("You succesfully ran away")
        opener.question("will you play again?", ["yes", "no", "...", "..."], myInput => {
            if (myInput == "yes") {
                startGame()
            }
            else opener.close()
        })
    } if ((run) < 50) {
        console.log("you failed to get away")
        startGame()
    }
}

function shop(){
    //have to finish costs 
    opener.question("what will you buy?", [`Potion${cost}`, `Antidote${cost}` , `Super Potion${cost}`, `Eather${cost}`], myInput => {
        if(myInput == "Potion") {

        }
    })
}

function demonSlayerAttack(attack, health) {
    tanjiro.whichAttack((attack) => {
        let damage = tanjiro.attacks[attack].damage
        // (place for codes that would add effectt to attack)
        if (tanjiro.attacks[attack].missChance >= Math.random() * 100) {
            console.log("attack missed")
        } else {
            demonGuy.health -= damage
            console.log(attack, "has landed for", damage, "demon's health is now", demonGuy.health)
        }
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
    })
}
function demonAttack(attack, health) {


    tanjiro.health -= demonGuy.dealDamage()
    console.log("Demon's dark claw has landed for,", demonGuy.damage, "tanjiro's health is now", (tanjiro.health))
    if (tanjiro.health <= 0) {
        console.log(demonSlayer.name + "has fainted, you lose");
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

startGame()

// function printMousePos(event) {
//     const rect = canvas.getBoundingClientRect()
//     const x = event.clientX - rect.left
//     const y = event.clientY - rect.top
//     console.log("x: " + x + " y: " + y)
// }

// canvas.addEventListener("click", printMousePos);

