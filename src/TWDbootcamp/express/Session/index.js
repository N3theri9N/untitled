const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');

const sessionOptions = {
    secret : 'thisisnotagoodsecret',
    resave : false,
    saveUninitialized : false,
}
app.use(session(sessionOptions))
app.use(flash());

app.use((req, res, next) =>{
    res.locals.messages = req.flash("info");
    next();
})

app.get('/flash', function(req, res){
    req.flash('info', 'Flash is back!')
    res.redirect('/');
});

app.get('/', function(req, res){
    // Get an array of flash messages by passing the key to req.flash()
    res.send( { messages: res.locals.messages });
});

app.get('/viewcount', (req, res) =>{
    if(req.session.count){
        req.session.count+= 1;
    } else {
        req.session.count = 1;
    }
    res.send(`you have viewed this page ${req.session.count} times`)
})

app.get('/register', (req, res)=>{
    const { username = 'Anonymous' } = req.query;
    req.session.username = username;
    res.redirect('/greet')
})

app.get('/greet', (req, res)=>{
    const { username } = req.session;
    res.send(`Welcome back, ${username}`);
})

app.listen(3000, ()=>{
    console.log('listening on port 3000')
})
