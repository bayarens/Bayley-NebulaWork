const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');
const output = document.getElementById('output')
const imageLoader = document.querySelectorAll("#imageLoader img")
const demonImageLoader = document.querySelectorAll("#demonImageLoader img")
const slayerHealthbar = document.querySelector("#slayerHealthBar")
const demonHealthbar = document.querySelector("#demonHealthBar")
const infoBox = document.querySelector("#infoDisplay")
const money = document.querySelector("#moneyCounter")
const zenitsuAttackInfo = "Thunder Clap: \n Damage: 40 Miss Chance: 10% Bleed: 5dmg \n\n Rice Spirit: \n Damage: 15 Miss Chance: 8% Healing: 35hp \n\n Heat Lighting: \n Damage: 10 Miss Chance: 5% Crit Chance: 75% \n\n God Speed: \n Damage: 280 Miss Chance: 75%";
const inousukeAttackInfo = "Pierce: \n Damage: 20 Miss Chance: 15% Bleed: 20dmg \n\n Rip and Tear: \n Damage: 35 Miss Chance 5% Healing: 10hp \n\n Crazy Cutting: \n Damage: 15 Miss Chance 10% Crit Chance: 60% \n\n Whirling Fangs: Damage: 150 Miss Chance 50%";
const tanjiroAttackInfo = "Water Wheel: \n Damage: 35 Miss chance: 20% Bleed: 10dmg \n\n Twisting Whirlpool: \n Damage: 20, Miss chance: 10% Healing: 20hp \n\n Striking Tide: \n Damage: 10 Miss chance: 2% Crit Chance: 35% \n\nConstant Flux: \n Damage: 200 Miss chance: 66%";
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

let roundCounter = 0;

class Player {
    constructor(name, health) {
        this.name = name;
        this.health = health;
        this.maxHealth = health
        this.minHealth = 0;
        this.money = 0;
        this.defending = false;
        this.poison = false;
        this.curse = false;
        this.poisonedRounds = 0;
        this.curseRounds = 0;
        if (name == "Tanjiro") {
            this.attacks = {
                "water wheel": { damage: 35, missChance: 20, bleedValue: 10 },
                "twisting whirlpool": { damage: 20, missChance: 10, healValue: 20 },
                "striking tide": { damage: 10, missChance: 2, critChance: 65 },
                "constant flux": { damage: 200, missChance: 66 },
            }
        }
        if (name == "Zenitsu") {
            this.attacks = {
                "thunder clap": { damage: 40, missChance: 10, bleedValue: 5 },
                "rice spirit": { damage: 15, missChance: 8, healValue: 35 },
                "heat lighting": { damage: 10, missChance: 5, critChance: 75 },
                "god speed": { damage: 280, missChance: 75 },
            }
        }
        if (name == "Inousuke") {
            this.attacks = {
                "pierce": { damage: 20, missChance: 15, bleedValue: 20 },
                "rip and tear": { damage: 35, missChance: 5, healValue: 10 },
                "crazy cutting": { damage: 15, missChance: 10, critChance: 60 },
                "whirling fangs": { damage: 150, missChance: 50 },
            }
        }
    }
    whichAttack = function (f) {
        tanjiroAttackOptions.responseFunc = attack => {
            if (attack == "twisting whirlpool") {
                chosenChar.changeHealth(-20);
            }
            if (attack == "water wheel") {
                demonGuy.bleed = true;
                demonGuy.bleedRounds = 4;
            }
            f(attack)
        }
        opener.question(tanjiroAttackOptions)
        populateInfoBox(tanjiroAttackInfo)
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
    changeHealth(num) {
        this.health -= num
        if (this.health > this.maxHealth) {
            this.health = this.maxHealth
        }
        if (this.health < this.minHealth) {
            this.health = this.minHealth
        }
        slayerHealthbar.innerText = this.health + "HP";
        let width = this.health / this.maxHealth * 400;
        slayerHealthbar.style.width = width + "px";
    }
    subtractMoney(cost) {
        chosenChar.money -= cost
        money.innerText = `$${chosenChar.money}`
    }
}

const tanjiro = new Player("Tanjiro", 500)
const zenitsu = new Player("Zenitsu", 350)
const inosuke = new Player("Inousuke", 650)

class Enemy {
    constructor(name, health, damageMin, damageMax, extraAbility = null, moneyDropped) {
        this.name = name;
        this.health = health;
        this.maxHealth = health;
        this.minHealth = 0;
        this.damageMin = damageMin;
        this.damageMax = damageMax;
        this.extraAbility = extraAbility;
        this.moneyDropped = moneyDropped;
        this.bleed = false;
        this.bleedRounds = 0;
    }
    dealDamage() {
        return Math.round(Math.random() * (this.damageMax - this.damageMin) + this.damageMin);
    }
    changeHealth(num) {
        this.health -= num
        if (this.health < this.minHealth) {
            this.health = this.minHealth
        }
        demonHealthbar.innerText = this.health + "HP";
        let width = this.health / this.maxHealth * 400
        demonHealthbar.style.width = width + "px";
    }
    addMoney() {
        if (demonGuy.health <= 0) {
            chosenChar.money += demonGuy.moneyDropped
            money.innerText = `$${chosenChar.money}`
        }
    }
    x = canvas.width - 200; //1340
    y = 280
    draw = function () {
        //ctx.clearRect(0, 0, 200, 500)
        ctx.drawImage(this.img, this.x, this.y)
    }
    imgQueue = []
    currentImg = 0

    startAnimation(animation) {
        if (animation == "idle") {
            this.imgQueue = demonImageLoader
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

const demonLackey = new Enemy("Lackey", 100, 20, 40, null, 50)
const demonMiniB = new Enemy("MiniBoss", 300, 50, 80, "poison", 125)
const demonBoss = new Enemy("MUZAN", 500, 100, 200, "curse", 200)
const demons = [demonLackey, demonMiniB, demonBoss]
nextEnemy()

function nextEnemy() {
    demonGuy = demons.shift()
}


class Item {
    constructor(name, effect, cost) {
        this.name = name
        this.effect = effect
        this.cost = cost;
    }
}

const potion = new Item("Potion", "heal100HP", 10)
const superPotion = new Item("SuperPotion", "heal250HP", 25)
const antidote = new Item("Antidote", "rmvStatusEffect", 15)
const ether = new Item("Ether", "healAllHP", 50)

const shopCost = {
    "potion $10": 10,
    "antidote $15": 15,
    "super potion $25": 25,
    "ether $50": 50
}

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

const endFightOptions = new MenuOption("Congratulations! Will you continue on?", ["Yes", "No", "...", "..."], myInput => {
    if (myInput == "yes") {
        nextEnemy()
        demonGuy.changeHealth(0)
        populateInfoBox(`${chosenChar.name} is now facing ${demonGuy.name}`)
        opener.question(startGameOptions)
    }
    // else opener.close()
})

const shopOptions = new MenuOption("Whata ya buying?", ["Potion $10", "Antidote $15", "Super Potion $25", "Ether $50"], myInput => {
    console.log(chosenChar.money, myInput)
    if (chosenChar.money < shopCost[myInput]) {
        populateInfoBox("you don't have enough money for this")
        opener.question(startGameOptions)
    } else {
        if (myInput == "potion $10") {
            chosenChar.changeHealth(-100)
            chosenChar.subtractMoney(potion.cost)
            populateInfoBox(`${chosenChar.name} Healed for 100HP`)
        }
        if (myInput == "antidote $15") {
            chosenChar.subtractMoney(antidote.cost)
            chosenChar.posion = false;
            chosenChar.curse = false;
            populateInfoBox(`${chosenChar.name} Removed Status Effect`)
        }
        if (myInput == "super potion $25") {
            chosenChar.changeHealth(-250)
            chosenChar.subtractMoney(superPotion.cost)
            populateInfoBox(`${chosenChar.name} Healed for 250HP`)
        }
        if (myInput == "ether $50") {
            chosenChar.subtractMoney(ether.cost)
            chosenChar.changeHealth(-(chosenChar.maxHealth - chosenChar.health))
            chosenChar.posion = false;
            chosenChar.curse = false;
            populateInfoBox(`${chosenChar.name}  Healed all HP & removed status effect`)
        }
    }
    setTimeout(demonAttack, 1500)
})

const runOptions = new MenuOption("will you pick up the sword again?", ["yes", "no", "...", "..."], myInput => {
    const run = (Math.floor(Math.random() * 100))
    if (run >= 50) {
    } else if ((run) < 50) {
        setTimeout(demonAttack, 1500)
    }
    if (myInput == "yes") {
        opener.question(startGameOptions)
        populateInfoBox("")
    }
})


const tanjiroAttackOptions = {
    outputQuestion: "Which attack will you use?",
    buttons: ["Water Wheel", "Twisting Whirlpool", "Striking Tide", "Constant Flux"],
    responseFunc: null
}



const playerAttackOptions = new MenuOption("Which attack will you use?", tanjiroAttackOptions.buttons, myInput => { })