//10만개 짜리라고 생각해라.

var v1 = 'v1';
// 100000 codes
v1 = 'egoing'; // 이거 하나로 버그가 생길 수도 있다.

var v2 = 'v2';
var o = {
    v1 : 'v1',
    v2 : 'v2'
}
// 하나의 객체안에 정리정돈해 넣을 수도 있음

function f1(){
    console.log(o.v1);
}

function f2(){
    console.log(o.v2);
}

f1();
f2();
// 그런데 이게 10만개가 있다면??!

var o2 = {
    v1:'v1',
    v2:'v2',
    f1: function(){ console.log(this.v1); },
    f2: function(){ console.log(this.v2); },
    f3: ()=> console.log(this.v2) // undefined 화살표함수는 this 를 못받는다!

} // 정리가 잘 되어있다. 각 변수별로 내부에 있는 관계가 있으므로...
//console.log(o2.v1) 이름이 o2 가 아닌 다른거라면?
//그러면 자기참조인 특수한 경우일때 쓰는 this 라는 자기참조 객체명을 사용한다.