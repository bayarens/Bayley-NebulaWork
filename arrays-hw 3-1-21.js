// using this array: 
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// log the length of the array
console.log(days.length) 

// log the 4th element in the array 
console.log(days[3]) 

// remove the first element in the array. Log the new array and the element removed from the array
days.shift();  
console.log(days, "<-- 12")  


// Add 'Sunday' at the beginning of the array and log the new array
days.unshift('Sunday')
console.log(days,"<-- 17") 

// Remove the last element in the array. Log the new array and log the element removed 
console.log(days.pop(),"<-- 20")  
console.log(days,"<-- 21")

// Add 'Saturday' to the end of the array and log the new array
days.push('Saturday')
console.log(days,"<--25") 

// replace 'Thursday' with 'Friday Junior'
console.log(days.indexOf('Thursday'),"<--28") // Thursday = 4
days[4] = "Friday Junior" 
console.log(days,"<-- 30")

// extract your favorite day from the array and log the string: 'My favorite day of the week is (day)'
console.log(days.indexOf('Saturday'),"<-- 33") 
let myFavDay = days[6] 
let weekPrompt = "My favorite day of the week is" 
console.log(weekPrompt, myFavDay,"<--36") 

// combine these two arrays together
let phone = ['iphone','android']
let laptop = ['MacBook','HP','Dell']
const joinedStrings = phone.join(laptop) 
console.log(joinedStrings,"<--42")   

/*
    Given the string "What Time Is It", create a new string:
    "What-Time-Is-It" using string and array methods.
    Make sure you store that new string in a variable.
    Log that variable.
*/

const x = 'What Time Is It' 
const arrayX = x.split() 
console.log(x,"<-- 53")
 
/*
    Turn the saved variable from above back into an array and mutate it into:
    - ["It", "Is", "Time"]
    Use only array methods / a certain string method to do this.
*/



// Read up till (not including) page 50 in Eloquent JavaScript