console.log("Oh no, DeamonSlayer has encountered a wild Demon")
const demonSlayer = {
    health: 100,
    whichAttack: function (f) {
        opener.question("Which attack will you use?", attack => f(attack))
        console.log(this.attacks)
    },
    attacks: {
        "Water Wheel": { damage: 50, missChance: 30, /*bleedValue: 5*/},
        "Twisting Whirlpool": { damage: 20, missChance: 10, /*healValue: 20*/},
        "Striking Tide": { damage: 10, missChance: 2, /*critChance: 35*/},
        "Constant Flux": { damage: 100, missChance: 80 },
    }
}

class Player {
    constructor(health, minDamage, maxDamage, level, experience){
        this.health = health;
        this.minDamage = minDamage;
        this.maxDamage = maxDamage;
        this.level = level;
        this.experience = experience;
    }
}

class Enemy {
    constructor(health, damageMin, damageMax, extraAbility = null){
        this.health = health;
        this.damageMin = damageMin;
        this.damageMax = damageMax;
        this.extraAbility = extraAbility;
    }

    performExtraAbility(){
        if(this.extraAbility){
            return this.extraAbility()
        } else {
            console.log("Enemy doesn't have an extra ability")
        }
    }

    dealDamage(){
        // Pick a random number between damageLower and damageHigher
        return Math.round(Math.random() * (this.damageMax - this.damageMin) + this.damageMin);
    }
}

// const demonGuy = {
//     health: 100,
//     //want to add a curse function that will kill 3 or 5 moves after landing, in case the demon gets really unlucky and only roles like single didget values
//     dealDamage: function () {
//         this.damage = Math.round(Math.random() * 100)
//         return this.damage
//     },
//     damage: Math.round(Math.random() * 100)
// }
function curseAbility(){
    console.log("I am cursed!");
}

const demonGuy = new Enemy(100, 20, 40);
const demonLvl2 = new Enemy(200, 20, 40);
const boss = new Enemy(500, 50, 100);

//Pick who goes first
const opener = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

function startGame() {
    opener.question("Will you attack, defend, or try to run away?", myInput => {
        if (myInput == "attack") {
            demonSlayerAttack()
        } else if (myInput == "defend") {
            //want to add an option where wait will turn into defend and demonSlayer will reduce incoming damage by 20% or something
            demonAttack() //demonGuy.damage 
        } else if (myInput == "run") {
            runOption()
        }
    })
}
function runOption(params) {
    const run = (Math.floor(Math.random() * 100))
    if ((run) >= 50) {
        console.log("You succesfully ran away")
        opener.question("will you play again?", myInput => {
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

startGame()
function demonSlayerAttack(attack, health) {
    demonSlayer.whichAttack((attack) => {
        let damage = demonSlayer.attacks[attack].damage
        // (place for codes that would add effectt to attack)
        if (demonSlayer.attacks[attack].missChance >= Math.random() * 100) {
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