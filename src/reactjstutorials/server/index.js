const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { User } = require("./models/User");
const { auth } = require("./middleware/auth");
const config = require("./config/key");

const app = express();
const port = 5000;

// 클라이언트 내용을 서버에서 분석해서 가져올 수 있도록 app 설정
// application/x-www-form-urlencoded 형식을 분석함
app.use(bodyParser.urlencoded({extended: true}));
//application/json 형식을 분석함
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(config.mongoURI
).then(()=> console.log("MongoDB Connected...")
).catch( err => console.log(err))
// mongoDB 연결. 그런데 github 에 DB id/pw 내용이 노출된다! -> 이 부분을 다른곳에 떼어서 저장하여 gitIgnore 에 뺀다.


app.get('/', (req, res) => res.send("Hello World!~~안녕하세요 ~ 새해 복 많이 받아 ")); // root 에서 helloWorld 리스폰 셋팅

app.post('/api/users/register' ,(req, res) => {
    // 회원가입 할때 필요한 내용들 저장
    // clicnt 에서 가져오면 데이터베이스에 넣어줌.


    const user = new User( req.body );

    // save 는 mongodb->mongoose 의 것
    user.save((err, userInfo) => {
        if (err) { console.log(err); return res.json({success: false, err}); }
        return res.status(200).json({ success : true });
    });
});

app.post("/api/users/login", (req, res) => {

    //요청된 이메일을 Db 에서 찾는다.
    //findOne은 mongoose 에서 제공한다.
    User.findOne({ email: req.body.email }, (err, user) => {

        if(!user){
            return res.json({
                loginSuccess: false,
                message : "제공된 이메일에 해당하는 유저가 없습니다."
            });
        }

        //있다면 비밀번호가 같은지 확인
        user.comparePassword( req.body.password, (err, isMatch ) => {
            console.log("comparePW isMatch; " + isMatch);
            if(!isMatch)
                return res.json({ loginSuccess: false, message: "비밀번호가 다릅니다."})

            //비밀번호까지 맞다면 토큰을 생성한다.
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);

                //DB에 저장한 동일한 토큰 저장. 주로 쿠키, 로컬저장소나 여러가지 방식으로 저장한다.
                //각기 장단점이 있음
                //여기서 쿠키 관련 라이브러리 사용.
                res.cookie("x_auth", user.token).status(200).json({ loginSuccess:true, message : "로그인 성공", userId : user._id});
                // response 에 x_auth 라는 이름으로 쿠키가 저장
            });
        })
    });
});

app.get("/api/users/auth", auth, (req, res) => {
    //ahtu 미들웨어 : 엔드포인트에서 callback 을 하기 전에 중간에 하는 절차.
    //next() 가 오고나면 여기 실행, isAuth 가 false 면 auth 에서 끝난다.
    //
    res.status(200).json({
        _id : req.user._id,
        isAdmin : req.user.role === 0 ? false : true,
        isAuth : true,
        email : req.user.email,
        name : req.user.name,
        lastname : req.user.lastname,
        role: req.user.role,
        image : req.user.image
    });
});

app.get('/api/users/logout', auth, (req, res) => {

    User.findOneAndUpdate(
        { _id: req.user._id, }, // where
        { token : "" } , // set
        (err, user) => {
        if(err) return res.json({ success:false, err });
        return res.status(200).send({ success:true });

    });

});

app.listen(port, () => console.log(`Example app listening on port ${port}`));

// Bodyparser : client 에서 받은 내용을 파싱하는 것

//npm install nodemon --save-dev : nodemon 은 devDependencies 에 넣기위해 --save-dev 로 설정
//"backend" : "nodemon index.js", 백엔드 실행시 nodemon index.js 스크립트로 실행한다. : npm start backend
//
