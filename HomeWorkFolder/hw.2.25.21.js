
// You will need to console.log for each problem 

// Create a variable and assign the string: "we are software engineers at nebula academy"
// Using the string…
let whoAreWe = "We are Software Engineers at Nebula Academy.";
// Log the index of 'software' <--- a little bit confusing / can be misinterpreted.
console.log(whoAreWe.length);
console.log(whoAreWe.indexOf("Software"));
let word3 = "Software";
console.log(whoAreWe.indexOf(word3));

// Cutting down the string into "Software Engineers at Nebula Academy."
let cutDown = whoAreWe.slice(7, 25);
// Finding the index of "e" in "Software" WITHIN the string "Software Engineers at Nebula Academy."
let indexOfE = cutDown.indexOf("e");
// Using the indexOfE, I am cutting out the word "Software" from "Software Engineers at Nebula Academy."
let software = cutDown.slice(0, indexOfE+1);
console.log(software, "<--- line 20");

// Log the index of 's'

// Log the index of 'web'
// Extract the word 'software' and log it
// Extract the word 'academy' and log it
// Create a variable and assign the string: "we are learning new string methods"
// Using the string…

// Log the length of the string
// Log the last character of the string
// Log the character at index 5
// Uppercase everything in the string
let myNewString = "tefe all the words";
let myUppercaseString = myNewString.toUpperCase();
console.log(myUppercaseString, "<--- uppercase");
console.log(myUppercaseString.toLowerCase());
// Lowercase everything in the string
// Create a new variable with your favorite ice cream flavor
// Log the string, 'My favorite ice cream flavor is (your favorite ice cream flavor)'
let myFav = "mango";
const iceCreamSentence = `My favorite ice cream flavor is ${myFav}.`;
console.log(iceCreamSentence);