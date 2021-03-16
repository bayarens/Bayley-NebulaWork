// 1. 
function greet (name, owner) {
    if(name == owner){
      return "Hello boss"
    } else {
      return "Hello guest"
    } 
  }

// 2. 
function doubleInteger(i) {
    i = (i*2)
    return (i);
  }

// 3.
function stringy(size) {
    var str = ""
      
      for (var i = 1; i <= size; i++) {
        str += i%2    
      }
      return str;
    }
    
// 4. 
function hydrate(drinks) {
    // your code here 
    let sumOfDrinks = 0
    let words = drinks.split(" ")
    let x = " glass of water"
    //isolates numbers within string to pull out, and add to sumOfDrinks
    for (i = 0; i < words.length; i++){
       let word = words[i] 
       if (Number(word)){
      sumOfDrinks += Number(word)
       }
         
      }
      if(sumOfDrinks > 1){ 
         x = " glasses of water"
        } 
      return (sumOfDrinks + x) 
  }
  