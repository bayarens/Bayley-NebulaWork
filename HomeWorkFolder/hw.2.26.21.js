/* 
    Ceate a variable and assign the string: "we are software engineers at nebula academy",
        then In ONE LINE (make this a dynamic piece of code) - extract the word "software" and log it. 
        (Note: this is difficult - DON'T DO IT. Seriously, maybe skip this).
*/

// Extra EXTRA
const str = "we are engineers software at nebula academy";

console.log(str.slice(7, 15));

// This code is a little bit more dynamic than hard coding the index values
console.log(str.slice(str.indexOf("software"), str.indexOf("e", str.indexOf("software"))+1));

// Another approach - more clear:
const idxOfSoftware = str.indexOf("software");
console.log(str.slice(idxOfSoftware, str.indexOf("e", idxOfSoftware)+1));
