
// loop 를 사용하지 않을 경우
/*
console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);
console.log(6);
console.log(7);
console.log(8);
console.log(9);
console.log(10);
*/


// i=1 로 시작하고 i가 10이 되기까지 매 시행마다 i 를 1씩 더한다
/*for ( let num = 1; num <= 10 ; num++){
    console.log("IN LOOP");
    console.log(num);
}*/
//

//짝수만 출력하려고 한다면.

/*
for( let i = 0 ; i <= 20; i += 2 ){
    console.log(i);
}
*/

// 여기서 2부터 출력시
/*
for( let i = 2 ; i <= 20; i += 2 ){
    console.log(i);
}
*/

// 100에서 10씩 낮춘다고 하면
/*
for( let i = 100 ; i >= 0 ; i -= 10){
    console.log(i);
}
*/

// 10의 지수 출력
/*
for( let i = 10 ; i<=1000 ; i *= 10 ){
    console.log(i);
}
*/

// 무한루프 예
/*
for ( let i = 20; i >= 0 ; i++){
    console.log(i);
}

*/

// 중첩루프
/*
for (let i = 1; i <= 10; i++){
    console.log(`i is: ${i}`);
    for(let j = 1 ; j<4 ;j++){
        console.log(`   j is: ${j}`);
    }
}*/
// 내부의 j 루프를 i 루프만큼 실행한다. 즉 10*3 = 30회 실행된다.

// 중첩루프를 실행하는경우는 중첩배열을 사용할때 위주로 사용된다.
/*
const seatingChart = [
    ['Kristen', 'Erik', 'Namita'],
    ['Geoffrey', 'Juanita', 'Antonio', 'Kevin'],
    ['Yuma', 'Sakura', 'Jack', 'Erika']
]

for (let i = 0; i < seatingChart.length; i++) {
    const row = seatingChart[i];
    console.log(`ROW #${i + 1}`)
    for (let j = 0; j < row.length; j++) {
        console.log(row[j])
    }
}
*/

/*
const SECRET = "BabyHippo";

let guess = "";
while(guess !== SECRET){
    guess = prompt("enter the secret code...");
}
console.log("CORRECT!");

*/

/*

const SECRET = "Break";
while(true){
    guess = prompt("enter the secret code...");
    if(guess === SECRET){
        break;
    }
}
console.log("CORRECT!");
*/

let maximum = '';
while(!maximum){ // NaN, String을 입력받을 수도 있으므로 제대로 된 값을 얻기까지 재시도
    maximum = parseInt(prompt("Enter the maximum number!"));
}

const targetNumber = Math.ceil(Math.random() * maximum);
let attempts = 1;

let guess = prompt("Enter your guess!");
/*
while (guess !== targetNumber){
    attempts++;
    if(guess > targetNumber){
        guess = parseInt(prompt("Too high! Enter a new guess:"));
    } else {
        guess = parseInt(prompt("Too low! Enter a new guess:"));
    }

}

console.log(`You Got It! It took you ${attempts} guesses`);

*/
// 취소기능 추가.
while ( parseInt(guess) !== targetNumber){
    if( guess === "q") break; // q를 입력시 즉시 취소
    attempts++;

    if(guess > targetNumber){
        guess = prompt("Too high! Enter a new guess:");
    } else {
        guess = prompt("Too low! Enter a new guess:");
    }
}

if (guess === 'q'){
    console.log("YOU, QUIT!");
} else {
    console.log(`You Got It! It took you ${attempts} guesses`);
}


