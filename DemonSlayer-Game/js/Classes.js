const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');
const output = document.getElementById('output')
let imageLoader = document.querySelectorAll("#imageLoader img")
const slayerHealthbar = document.querySelector("#slayerHealthBar")
const demonHealthbar = document.querySelector("#demonHealthBar")
const infoBox = document.querySelector("#infoDisplay")
const tanjiroAttackInfo = "Water Wheel: \n Damage: 50 Miss chance: 30% bleed: 5dmg \n \n Twisting Whirlpool: \n Damage: 20, Miss chance: 10% Healing: 20HP \n \n Striking Tide: \n Damage: 10 Miss chance: 2% Critcal hit chance: 35% \n \nConstant Flux: \n Damage: 100 Miss chance: 66%"
const opener = {
    question({ outputQuestion, buttons, responseFunc }) {
        output.innerText = outputQuestion;
        this.responseFunc = responseFunc;
        this.buttons = buttons;
        for (let i = 0; i < buttons.length; i++) {
            allButtons[i].innerText = buttons[i]
        }
    },
    submitQuestion(e) {
        opener.responseFunc(e.target.innerText.toLowerCase())
    },
}

class Player {
    constructor(name, health, defense) {
        this.health = health;
        this.name = name;
        this.defense = defense
        this.money = 0;
        this.defending = false
    }
    whichAttack = function (f) {
        tanjiroAttackOptions.responseFunc = attack => f(attack)
        opener.question(tanjiroAttackOptions)
        populateInfoBox(tanjiroAttackInfo)
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

const tanjiro = new Player("Tanjiro", 500, 25)
const zenitsu = new Player("Zenitsu", 350, 10)
const inosuke = new Player("Inousuke", 650, 45)

class Enemy {
    constructor(health, damageMin, damageMax, extraAbility = null, order) {
        this.health = health;
        this.damageMin = damageMin;
        this.damageMax = damageMax;
        this.extraAbility = extraAbility;
        this.order = order;
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

const demonGuy = new Enemy(100, 20, 40, 1)
const demonMiniB = new Enemy(300, 50, 80, 2)
const demonBoss = new Enemy(500, 100, 200, 3)

class Shop {
    constructor(name, effect, cost) {
        this.name = name
        this.effect = effect
        this.cost = cost;
    }
}


const potion = new Shop("Potion", "heal100HP", 10)
const superPotion = new Shop("SuperPotion", "heal250HP", 25)
const antidote = new Shop("Antidote", "rmvStatusEffect", 15)
const ether = new Shop("Ether", "healAllHP", 50)

class MenuOption {
    constructor(outputQuestion, buttons, responseFunc) {
        this.outputQuestion = outputQuestion;
        this.buttons = buttons;
        this.responseFunc = responseFunc;
    }
}
const startGameOptions = new MenuOption("What will you do slayer?", ["Attack", "Defend", "Run", "Shop"], myInput => {
    demonHealthbar.innerText = demonGuy.health + "HP";
    if (myInput == "attack") {
        demonSlayerAttack()
    } else if (myInput == "defend") {
        defendOption()
    } else if (myInput == "run") {
        runOption()
    } else if (myInput == "shop") {
        shop()
    }
})

const endGameOptions = new MenuOption("Congratulations! Will you continue on?", ["Yes", "No", "...", "..."], myInput => {
    if (myInput == "yes") {
        startGame()
    }
    else opener.close()
})

const shopOptions = new MenuOption("Whata ya buying?", ["Potion $10", "Antidote $15" , "Super Potion $25", "Ether $50"], myInput => {
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

const runOptions = new MenuOption("will you pick up the sword again?", ["yes", "no", "...", "..."], myInput => {
    const run = (Math.floor(Math.random() * 100))
    if (run >= 50) {
    }   else if ((run) < 50) {
        tanjiro.startAnimation("idle")
        tanjiro.playAnimation()
        setTimeout(demonAttack, 1500)
    }
    if (myInput == "yes"){
        opener.question(startGameOptions)
        populateInfoBox("")
    }
})


    const tanjiroAttackOptions = {
        outputQuestion: "Which attack will you use?",
        buttons: ["Water Wheel", "Twisting Whirlpool", "Striking Tide", "Constant Flux"],
        responseFunc: null
    }

    const playerAttackOptions = new MenuOption("Which attack will you use?", tanjiroAttackOptions.buttons, myInput => {})