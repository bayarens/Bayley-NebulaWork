// 1. 
let x = "we are software engineers at nebula academy"
console.log(x.indexOf("software"))
console.log(x.indexOf("s"))
console.log(x.indexOf("we")) 
console.log(x.slice(7,15)) 
console.log(x.indexOf("academy")) 
console.log(x.slice(36,43))
// 2. 
let y = "we are leaRninG new stRinG methods" 
console.log(y.length) 
console.log(y[33])
console.log(y[5])
console.log(y.toUpperCase()) 
console.log(y.toLowerCase()) 
// 3. 
const my = "my" 
const favorite = "favorite" 
const ice = "ice" 
const cream = "cream"
const is = "is"

let fav = "chocolate" 

let template = `${my} ${favorite} ${ice} ${cream} ${is}` 
console.log(template, fav)

// can also just do it this way, much simpler

console.log("my favorite icecream is"+ " " + fav); 