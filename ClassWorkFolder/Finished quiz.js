//If you are proviveded a snippet do not uncomment and run.
//You are allowed to use W3schools, MDN and your notes

//MDN - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/
//W3Schools - https://www.w3schools.com/js/default.asp


//1.)There are 3 javascript keywords to initialize a variable. create A new variable below called value and set it to an empty string

// -Let, const, var 
let value = ""

//2.)JavaScript has many data types. String is an example of one. Name 2 more

// - Boolean, array, object, and number

//3.)Evaluate the following statements: [What would this line of code return in my console]
//Don't run these exact line of code! [anything close is allowed]
    //4A.) console.log("4" + 4)

    // - 44, just pushes the two diffrent datatypes together, dosent actually do math 

    //4B.) console.log("4" * 4)

    // - 16, inverse of the last one the * actually does do math

    //4C.) console.log("4" == 4)

    // - True, thats a comparission so it will have a boolean value

    //4D.) console.log("Tefe".indexOf("E"))

    // - nothing there is no "E"
    
    // 4E.) console.log("Javascript Is Fun".split(" "))

    //- ['Javascript', 'is', 'fun'] 

//4.)Write a function that takes an array as input and console logs each element in the array

function nameEach(array) {
for(i =0; i < array.length; i++){
    console.log(array[i])
}   
}
let names = ["Bayley", "Jessica", "Lucian",]

nameEach(names)


//5.) Which of the following statements is not true about for loop statement:

    //A.) You can declare a variable in a for loop
    //B.) You can't make an infinite loop in a for loop
    // -FALSE
    //C.) You can exit out of a for loop with the break keyword
    //D.) For loops can increment upwards dowards or even not at all  //ask for clarifcation if this is confusing you


//6.) Write a function that takes an array of numbers as input and returns the average of all the numbers

/*
let total = [ 0, 1, 2, 3 ].reduce(
    ( accumulator, currentValue ) => accumulator + currentValue,
    0
  )
*/ 

const arrayEx = [5, 8, 12, 20, 10]
const arrAverage = array => array.reduce((a,b) => a + b, 0) / array.length

console.log(arrAverage(arrayEx))


//7.) You are given a dataset where you have nested arrays of information and you need to sort through all that information to sum up all the numbers.
/*
ie.

const matrix = [[1,2,[4,55],[41,455],[525,525,[13,567,96,33]],[45,4145,682]]]
*/
    //7A.) There are two potential 1 word answers for the name the approach you need to take to solve this problem. Name either one [ First one starts with I, Second one starsts with R ]
    //- Iteration or Recusion
    //7B.) In 1-2 sentances explain high level [like if you were explaining to a 5 year old] what your approach to solving this would be.