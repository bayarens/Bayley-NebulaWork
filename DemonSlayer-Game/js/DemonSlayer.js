const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');
const output = document.getElementById('output')

function draw() {
    if (canvas.getContext) {
        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.fillRect(10, 10, 50, 50);
        ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
        ctx.fillRect(30, 30, 50, 50);
    }
}
let imageLoader = document.querySelectorAll("#imageLoader img")

console.log("Oh no, DeamonSlayer has encountered a wild Demon")
const demonSlayer = {
    health: 100,
    whichAttack: function (f) {
        opener.question("Which attack will you use?", attack => f(attack))
        console.log(this.attacks)
    },
    attacks: {
        "Water Wheel": { damage: 50, missChance: 30, /*bleedValue: 5*/ },
        "Twisting Whirlpool": { damage: 20, missChance: 10, /*healValue: 20*/ },
        "Striking Tide": { damage: 10, missChance: 2, /*critChance: 35*/ },
        "Constant Flux": { damage: 100, missChance: 80 },
    },
    x: 25,
    y: 335,
    draw: function () {
        ctx.clearRect(0, 0, 800, 500)
        ctx.drawImage(this.img, this.x, this.y)
    },
    imgQueue: [],
    currentImg: 0,

    startAnimation(animation) {
        if (animation == "idle") {
            this.imgQueue = imageLoader
            this.currentImg = 0
        }
    },
    playAnimation() {
        setTimeout(() => this.playAnimation(), 200)
        this.currentImg = (this.currentImg + 1) % this.imgQueue.length
        this.img = this.imgQueue[this.currentImg]
        this.draw()
    }
}
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
//const response = document.getElementById('response')
const submitBut = document.querySelectorAll(".submit")

const opener = {
    question(outputQuestion, responseFunc) {
        output.innerText = outputQuestion;
        this.responseFunc = responseFunc;
    },
    submitQuestion(e) {
        console.log(e)
        opener.responseFunc(e.target.innerText.toLowerCase())
        //       response.value = ""
    }
}

//response.addEventListener("submit", opener.submitQuestion);
for (i = 0; i < submitBut.length; i++) {
    submitBut[i].addEventListener("click", opener.submitQuestion)
}


function startGame() {
    demonSlayer.startAnimation("idle")
    demonSlayer.playAnimation()
    opener.question("What will you do slayer?", myInput => {
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

startGame()

// function printMousePos(event) {
//     const rect = canvas.getBoundingClientRect()
//     const x = event.clientX - rect.left
//     const y = event.clientY - rect.top
//     console.log("x: " + x + " y: " + y)
// }

// canvas.addEventListener("click", printMousePos);

