const express = require('express');
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const { User } = require("./models/User");
const config = require("./config/key");

const app = express();
const port = 5000;

// 클라이언트 내용을 서버에서 분석해서 가져올 수 있도록 app 설정
// application/x-www-form-urlencoded 형식을 분석함
app.use(bodyparser.urlencoded({extended: true}));
//application/json 형식을 분석함
app.use(bodyparser.json());

mongoose.connect(config.mongoURI
).then(()=> console.log("MongoDB Connected...")
).catch( err => console.log(err)) // mongoDB 연결 그런데 github 에 내용이 노출된다?! -> 이 부분을 다른곳에 떼어서 저장하여 gitIgnore 에 뺀다.


app.get('/', (req, res) => res.send("Hello World!~~안녕하세요 ~ 새해 복 많이 받아 ")); // root 에서 helloWorld 리스폰 셋팅

app.post('/register' ,(req, res) => {
    // 회원가입 할때 필요한 내용들 저장
    // clicnt 에서 가져오면 데이터베이스에 넣어줌.


    const user = new User( req.body );

    // save 는 mongodb->mongoose 의 것
    user.save((err, userInfo) => {
        if (err) return res.json({success: false, err});
        return res.status(200).json({ success : true });
    });
});
app.listen(port, () => console.log(`Example app listening on port ${port}`));

// Bodyparser : client 에서 받은 내용을 파싱하는 것

//npm install nodemon --save-dev : nodemon 은 devDependencies 에 넣기위해 --save-dev 로 설정
//"backend" : "nodemon index.js", 백엔드 실행시 nodemon index.js 스크립트로 실행한다. : npm start backend
//
