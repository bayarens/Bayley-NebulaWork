/*  
    Fortune Teller Machine Project
        (Comp Sci / Programming concept: Control Flow) -> 
            Control Flow: The order in which individual statements, instructions or function calls are executed or evaluated.
    
    Goal: Create a program that spits out a random fortune everytime you run it. The program should accept a username and include it 
        in the fortune (to personalize the message) ie: "Hello Tefe Del Rosario-Bell, your future is looking kinda bleak my friend."

        How do I do this?
        - Create a random number.
        - Create a control flow (if..else statements) to determine what is logged to the console, based on that random number.
        - Definitely feel free to get creative.
*/
const ZOLTAR = "Good evening Mr. Arens, I am the wizard ZOLTAR and"
const ftrn =(Math.floor(  Math.random()*1000 ))   
console.log(ftrn) 

if((ftrn) < 100){
    console.log(ZOLTAR, "I see HORRIBLE things in your future")
} else if 
    ((ftrn) < 500){
    console.log(ZOLTAR, "I see bad things in your future")
} else if
    ((ftrn) == 500){
    console.log(ZOLTAR, "You're a pretty boring guy huh?")
} else if
    ((ftrn) > 500){ 
console.log(ZOLTAR, "I see good things in your future") 
} else if
    ((ftrn) > 900){
console.log(ZOLTAR, "I see GREAT things in your future")
} 


     


    