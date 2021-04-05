const redBtn = document.querySelector('#redButton');
const blueBtn = document.querySelector('#skyblueButton');
const tealBtn = document.querySelector('#tealButton');
const yellowBtn = document.querySelector('#yellowButton');
// Add event listeners / handlers here...
// Extra credit: make the border bigger on the selected circle
// Extra credit: add a reset button - turns background white

function redScheme () {
    document.querySelector("body").className = "red-scheme";
    redBtn.addEventListener('click', () => {
        const curColour = document.body.style.backgroundColor;
        if(curColour !== 'red'){
            document.body.style.backgroundColor = "red";
        }
    })
};

function skyBlueScheme(){
    document.querySelector("body").className = "skyblue-scheme";
    blueBtn.addEventListener('click', () => {
        const curColour = document.body.style.backgroundColor;
        if(curColour !== 'skyblue'){
            document.body.style.backgroundColor = "skyBlue";
        }
    })
};

function yellowScheme(){
    document.querySelector("body").className = "yellow-scheme";
    yellowBtn.addEventListener('click', () => {
        const curColour = document.body.style.backgroundColor;
        if(curColour !== 'yellow'){
            document.body.style.backgroundColor = "yellow";
        }
    })
};

function tealScheme(){
    document.querySelector("body").className = "teal-scheme";
    tealBtn.addEventListener('click', () => {
        const curColour = document.body.style.backgroundColor;
        if(curColour !== 'teal'){
            document.body.style.backgroundColor = "teal";
        }
    })
};