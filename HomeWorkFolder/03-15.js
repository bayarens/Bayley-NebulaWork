// Nth smallest element question 
function nthSmallest(arr, pos){
    let sortedArr = arr.sort((a,b) => a-b);
    // .sort sorts the elements in the array but it does not know how to sort numbers 
    //((a,b) => a-b) is telling my sort function to sort them in ascending order
    return sortedArr[pos-1];
    //have to account for the 0 position herer
  }


// even or odd which is greater 
function evenOrOdd(str) {
    //this line(3) breaks up the string into substings with the split method
  let arr = str.split('')
  //this line(5) sets the value of all even elements to even by .filitering throught the array on the bases of if the element(a) is divided by 2 it has a remainder of 0 making it even 
  let even = arr.filter(a => a%2 == 0)
  //this line(7) does the same as line (5) except we are setting value of all odd elements in the odd variable
  let odd = arr.filter(a => a%2 > 0)
  
  
  let oddSum = odd.map(a => Number(a)).reduce((a,b)=> a+b)
  let evenSum = even.map(a => Number(a)).reduce((a,b)=> a+b)
  //in these line create new arrays with the .map funciton and populating it with the results of the function we are imputing, the Number() to coerce the datatype to a number then giving us the sum with .reduce((a,b)=> a+b) 
  if(evenSum < oddSum){
    return "Odd is greater than Even"
    } else if(evenSum > oddSum){
    return "Even is greater than Odd"
    } else {
    return "Even and Odd are the same"
    }
  }
  //these lines are the conditions for the oddSum and evenSum  

function solve(arr) {
    let revMap = []
    let revDirections = []
    for (let i = 0; i < arr.length; i++) {
        // "Begin on 3rd Blvd"
        let ele = arr[i]
        // ["Begin", "on", "3rd", "Blvd"]
        let words = ele.split(" ")
        if (i == 0) {
            // revDirections = ["Begin"]
            revDirections.unshift("Begin")
        }
        else{
            // (JUMPING TO SECOND ITERATION)
            // revDirection = ["Begin", "Right"]
            revDirections.push(words[0]) 
        }
            // "on 3rd BLVD"
            let eleLeftovers = ele.slice(ele.indexOf(" "))
            // revMap = ["on 3rd BLVD"]
            // (SECOND ITERATION)
            // revMap = ["on First Road", "on 3rd BLVD"]
            revMap.unshift(eleLeftovers) 
    }
    let value = []
    // REV MAP
    // revMap = ["on 9th Dr", "on First Road", "on 3rd BLVD"]

    // REV DIRECTIONS
    // revDirections = ["Begin", "Right", "Left"]
    for (let i=0; i < revMap.length; i++){
        value.push(revDirections[i] + revMap[i])
    }

    // OUTPUT
    // value = ["Beginon 9th Dr", "Righton First Road", "Lefton 3rd BLVD"]
    return value
}
console.log(solve(['Begin on 3rd Blvd', 'Right on First Road', 'Left on 9th Dr']))
//['Begin on 9th Dr', 'Right on First Road', 'Left on 3rd Blvd']) 



function solve2(inputArr) {
    let onRoads = [];
    let directions = [];
    let output = [];
    
    for (let i = 0; i < inputArr.length; i++) {
        const el = arr[i];
        const words = el.split(" ");
      
        if(i !== 0) {
          if(words[0] === "Right"){
            directions.push("Left");
          } else {
            directions.push("Right");
          }
        }
      
        let onRoad = el.slice(el.indexOf(" "));
        onRoads.push(onRoad);
    }
    
    onRoads = onRoads.reverse();
    directions = directions.reverse();
  
    for (let i=0; i < onRoads.length; i++){
       if(i === 0){
         output.push("Begin" + onRoads[i]);
       } else {
         output.push(directions[i - 1] + onRoads[i]);
       }   
    }

    return output;
}