const redBtn = document.querySelector('#redButton');
const blueBtn = document.querySelector('#skyblueButton');
const tealBtn = document.querySelector('#tealButton');
const yellowBtn = document.querySelector('#yellowButton');
// Add event listeners / handlers here...
// Extra credit: make the border bigger on the selected circle
// Extra credit: add a reset button - turns background white

redBtn.addEventListener('click', function redScheme () {
    document.querySelector("body").className = "red-scheme";
    }) 

 blueBtn.addEventListener('click', function skyBlueScheme () {
    document.querySelector("body").className = "skyblue-scheme";
    })  

yellowBtn.addEventListener('click', function yellowScheme () {
    document.querySelector("body").className = "yellow-scheme";
    })


tealBtn.addEventListener('click', function tealScheme(){
    document.querySelector("body").className = "teal-scheme";
    })