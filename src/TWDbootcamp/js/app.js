/*
console.log("HELLO FROM OUR FIRST JS FILE!!!")

console.warn("GOODBYE!");*/

//condition
/*
let random = Math.random();
console.log("your number :", random);
if ( random < 0.5 ){
    console.log("YOUR NUMBER IS LESS THAN 0.5!!!");
}
*/

// else-if
/*
const dayOfWeek = prompt("ENTER A DAY").toLowerCase();

if(dayOfWeek === "monday"){
    console.log("UGHHH I HATE MONDAYS!");
} else if ( dayOfWeek === "saturday"){
    console.log("YAY I LOVE SATURDAYS!");
} else if ( dayOfWeek === "friday"){
    console.log("FRIDAYS ARE DECENT, ESPECIALLY AFTER WORK!");
}
// else
else {
 console.log("MEH")
}
*/

/*
const age = parseInt(prompt("ENTER YOUR AGE"));

if(age < 5){
  console.log("You are a baby. you get in for free!");
} else if ( age < 10 ){ // 위 if 문이 false 라 자연스럽게 5<= age <10 인 것과 다름 없다.
    console.log("You are a child. You pay $10");
} else if ( age < 65 ){
    console.log("You are an adult. You pay $20");
} else {
    console.log("You are a senior. You pay $10");
}
*/

/*
Nested

const password = prompt("please enter a new password");

// Password must be 6+ characters
if(password.length >= 6){
    console.log("LONG ENOUGH PASSWORD!");
} else {
    console.log("PASSWORD TOO SHORT! Must be 6+ characters");
}

// Password cannot include space
if(password.trim().indexOf(" ") === -1){
    console.log("Good job! No space!");
} else {
    console.log("Password cannot contain spaces!");
}
// 2개의 조건문을 아래처럼 한데 묶음.

if(password.length >= 6){
    if(password.trim().indexOf(" ") === -1){
        console.log("Valid Password!");
    } else {
        console.log("Password cannot contain spaces!");
    }
} else {
    console.log("PASSWORD TOO SHORT! Must be 6+ characters");
}

*/


// Logical Operators
// AND
/*

if(password.trim().indexOf(" ") === -1 && password.length >= 6){
    console.log("VALID PASSWORD!");
} else {
    console.log("INCORRENT FORMAT FOR PASSWORD!");
}
*/
// OR
/*

let age = 10;
if( age >= 0 && age < 5 || age >= 65){
    console.log("FREE");
} else if ( age >= 5 && age < 10 ){ // 위 if 문이 false 라 자연스럽게 5<= age <10 인 것과 다름 없다.
    console.log("$10");
} else if ( age >= 10 && age < 65 ) {
    console.log("$20");
}*/
//NOT
/*
let firstName = prompt("enter value");
if(!firstName){
    console.log("FALSY");
}
*/

// SWITCH-CASE-DEFAULT
const day = prompt("INPUT TODAY");
switch(day){
    case 1 :
        console.log("MONDAY");
        break;
    case 2 :
        console.log("TUESDAY");
        break;
    case 3 :
        console.log("WEDNESDAY");
        break;
    case 4 :
        console.log("THURSDAY");
        break;
    case 5 :
        console.log("FRIDAY");
        break;
    case 6 :
    case 7 :
        console.log("WEEKEND!");
        break;
    default :
        console.log("I DON'T KNOW WHAT");
        break;
}
