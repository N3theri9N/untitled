var fs = require('fs');

function normal() {
    console.log('A');
    var result = fs.readFileSync('./syntax/sample.txt', 'utf-8');  // 동기적처리 : readFileSync 인 경우는 리턴값이 잇음

    console.log(result);
    console.log('C');
}


function sync () {
    console.log('A');
    fs.readFile('./syntax/sample.txt', 'utf-8', function(err, result){ // 비동기적 처리 : readFile 인 경우는 리턴값이 없음
        // result 에 인자를 두고 콜백실행 그러나 C 가 먼저 실행된다.
        console.log(result);
    });
    console.log('C');
}
sync();

