const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');
const output = document.getElementById('output')
let imageLoader = document.querySelectorAll("#imageLoader img")
const slayerHealthbar = document.querySelector("#slayerHealthBar")
const demonHealthbar = document.querySelector("#demonHealthBar")
const infoBox = document.querySelector("#infoDisplay")

function populateInfoBox(text) {
    infoBox.innerText = text
}

function draw() {
}

class Player {
    constructor(name, health) {
        this.health = health;
        this.name = name;
        this.money = 0;
    }
    whichAttack = function (f) {
        opener.question("Which attack will you use?", ["Water Wheel", "Twisting Whirlpool", "Striking Tide", "Constant Flux"] ,attack => f(attack))
        populateInfoBox("Water Wheel: \n Damage: 50 Miss chance: 30% bleed: 5dmg \n \n Twisting Whirlpool: \n Damage: 20, Miss chance: 10% Healing: 20HP \n \n Striking Tide: \n Damage: 10 Miss chance: 2% Critcal hit chance: 35% \n \nConstant Flux: \n Damage: 100 Miss chance: 66%")
    }
    attacks = {
        "water wheel": { damage: 50, missChance: 30, /*bleedValue: 5*/ },
        "twisting whirlpool": { damage: 20, missChance: 10, /*healValue: 20*/ },
        "striking tide": { damage: 10, missChance: 2, /*critChance: 35*/ },
        "constant flux": { damage: 100, missChance: 66 },
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
const tanjiro = new Player("Tanjiro", 500) 

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
        return Math.round(Math.random() * (this.damageMax - this.damageMin) + this.damageMin);
    }
}

const demon = new Enemy(100, 20, 40)
const demonLvl2 = new Enemy(150, 30, 60)
const demonMiniB = new Enemy(300, 50, 80)
const demonBoss = new Enemy(500, 100, 200)

class Shop {
    constructor(name, effect, cost) {
        this.name = name
        this.effect = effect
        this.cost = cost;
    }
}

const potion = new Shop("Potion", "heal100HP", 10) 
const superPotion = new Shop("SuperPotion", "heal250HP", 25)
const antidote = new Shop("Antidote", "rmvPoison", 15)
const ether = new Shop("Ether", "healAllHP", 50)

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

const opener = {
    question(outputQuestion, buttons, responseFunc) {
        output.innerText = outputQuestion;
        this.responseFunc = responseFunc;
        this.buttons = buttons;
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
    populateInfoBox((`Oh no, ${tanjiro.name} has encountered a blood starved Demon! Prepare yourself!`))
    console.log(tanjiro)
    tanjiro.startAnimation("idle")
    tanjiro.playAnimation()
    opener.question("What will you do slayer?", ["Attack", "Defend", "Run", "Shop"] ,myInput => {
        if (myInput == "attack") {
            demonSlayerAttack()
        } else if (myInput == "defend") {
            defendOption()
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
        populateInfoBox("You succesfully ran away")
        opener.question("will you play again?", ["yes", "no", "...", "..."], myInput => {
            if (myInput == "yes") {
                startGame()
            }
            else opener.close()
        })
    } if ((run) < 50) {
        populateInfoBox("You failed to get away")
        tanjiro.startAnimation("idle")
        tanjiro.playAnimation()
    }
}

function defendOption(){
    populateInfoBox(`${tanjiro.name} defended the attack`)
}

function shop(){
    populateInfoBox("Potion: Heal 100HP \n Antidote: Remove Poison Status \n Super Potion: Heal 250HP \n Ether: Heal All HP")
    opener.question("what will you buy?", [`Potion $${potion.cost}`, `Antidote $${antidote.cost}` , `Super Potion $${superPotion.cost}`, `Ether $${ether.cost}`], myInput => {
        if(myInput == "Potion") {
            populateInfoBox(`${tanjiro.name} Healed for 100HP`)
        }
        if (myInput == "Antidote") {
            populateInfoBox(`${tanjiro.name} Cured Poison`)
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
            opener.question("What will you do slayer?", ["Attack", "Defend", "Run", "Shop"] ,myInput => {
                if (myInput == "attack") {
                    demonSlayerAttack()
                } else if (myInput == "defend") {
                    defendOption()
                } else if (myInput == "run") {
                    runOption()
                } else if (myInput == "shop"){
                    shop()
                } 
            })
        } else {
            demonGuy.health -= damageNum
            populateInfoBox(`${attack} has landed for ${damageNum} demon's health is now ${demonGuy.health}`)
            opener.question("What will you do slayer?", ["Attack", "Defend", "Run", "Shop"] ,myInput => {
                if (myInput == "attack") {
                    demonSlayerAttack()
                } else if (myInput == "defend") {
                    defendOption()
                } else if (myInput == "run") {
                    runOption()
                } else if (myInput == "shop"){
                    shop()
                } 
            })
        }
        if (demonGuy.health <= 0) {
            populateInfoBox("The Demon has been slain, you win!");
            opener.question("will you play again?", ["yes", "no", "...", "..."], myInput => {
                if (myInput == "yes") {
                    startGame()
                }
                else opener.close()
            })
        }
        else setTimeout(demonAttack, 1500)
    })
}

function demonAttack() {
    tanjiro.health -= demonGuy.dealDamage()
    populateInfoBox(`Demon's dark claw has landed for ${demonGuy.damage} ${tanjiro.name}'s health is now, ${tanjiro.health}`)
    opener.question("What will you do slayer?", ["Attack", "Defend", "Run", "Shop"] ,myInput => {
        if (myInput == "attack") {
            demonSlayerAttack()
        } else if (myInput == "defend") {
            defendOption()
        } else if (myInput == "run") {
            runOption()
        } else if (myInput == "shop"){
            shop()
        } 
    })
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

