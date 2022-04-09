/*
function a(){
    console.log('A');
}
*/
var a = function(){
    console.log('A');
}

function showfunc(callback){
    callback();
}

showfunc(a); // 다소 오랜시간이 걸려 실행됨