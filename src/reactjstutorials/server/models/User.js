const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const bcryptprops = {
    "saltRounds" : 10
};

const userSchema = mongoose.Schema({
    name : {
        type : String,
        maxLength : 50
    },
    email : {
        type : String,
        trim : true,
        unique : 1
    },
    password : {
        type : String,
        minLength : 5
    },
    lastname : {
        type : String,
        maxLength : 50
    },
    role : {
        type : Number,
        default : 0
    },
    image : String,
    token : {
        type : String
    },
    tokenExp : {
        type : Number
    }
});

// mongoose 의 API : 유저 모델을 저장하기 전에 무엇을 한다고 정의 ( 트리거 )
userSchema.pre('save', function ( next ){
    var user = this;

    if(user.isModified('password')){ // 비밀번호를 암호화할때 암호화 시키는 것이므로 해당 제한 적용

        bcrypt.genSalt( bcryptprops.saltRounds, function (err, salt) {
            if(err) return next(err) // 에러시 next로 이동 즉 user.save(err) 실행

            bcrypt.hash( user.password, salt, function (err, hash){
                //hash 는 암호화된 내용.
                if(err) return next(err)
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
    // 비밀번호 암호화 시킴


    // 여기까지 진행후 user.save() 를 실행시킨다.
});

//plainPassword 1234567  암호화된 비밀번호 : $2b$10$LJMDwevj5DTnAs84PlXQ1.6UBWiK0dJr6to6/z5esce4Es7I5N7d6
//복호화하지말고 암호화해서 비교한다.
userSchema.methods.comparePassword = function(plainPassword, callbackFunc){

    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return callbackFunc
        callbackFunc(null, true);
    });
}

userSchema.methods.generateToken = function( callbackFunc ){
    //json
    //아래껀 Expected "payload" to be a plain object 라는 오류발생
    //let token = jwt.sign(this._id, 'secretToken')

    let token = jwt.sign(this._id.toHexString(), 'secretToken')

    // token 은  this._id + 'secretToken'

    this.token = token;
    this.save(function(err, user){
        if(err) return callbackFunc(err)

        callbackFunc(null, user);
    });
}

userSchema.statics.findByToken = function(token, callbackFunc){

    // token 매개변수를 decode
    jwt.verify(token, 'secretToken', function(err, decoded){
       //decoded = _id
        // userId 를 이용해 유저를 찾을 후 클라이언트에서 가져온 token 과 db 에 보관된 토큰이 같은지 확인
        User.findOne({"_id" : decoded, "token": token } , function ( err, user){
           if(err) return callbackFunc(err);
           callbackFunc(null, user);
        });
    });
}

const User = mongoose.model('User', userSchema);

module.exports = { User };