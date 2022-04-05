var args = process.argv;
/*
>node ./Conditional.js egoing
[
    'C:\\Program Files\\nodejs\\node.exe', // args[0] : 런타임 경로
    'D:\\GitHubDesktop\\untitled\\src\\syntax\\Conditional.js' // args[1] : 실행중인파일
    'egoing' // args[2] : 콘솔에 입력한 값
]
*/
console.log(args);
console.log('A');
console.log('B');

if(args[2] === '1'){
    console.log('C1');
} else {
    console.log('C2');
}
console.log('D');