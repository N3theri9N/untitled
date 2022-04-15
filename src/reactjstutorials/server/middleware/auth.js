const { User } = require("../models/User");

let auth = ( req, res, next) => {
    //인증처리 담당

    //1. client 에서 쿠키에서 토큰 추출
    let token = req.cookies.x_auth;

    //2. token 을 복호화 한 후 유저를 찾음.
    User.findByToken(token, (err,user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true })

        req.token = token;
        req.user = user;
        next(); // next 가 없다면 미들웨이에서 갇힌다.
    });

    //3. 유저가 있으면 인증 완료


    //4. 유저가 없으면 인증 거부
}

module.exports = { auth };