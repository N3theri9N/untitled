var M = {
    v: 'v',
    f: function(){
        console.log(this.v)
    }
}

module.exports = M;
// 지금 만들고 있는 모듈이 있는 여러기능들 중에서 M 이 가르키는 객체를 모듈 밖에서 사용할 수 있도록 export 한다.