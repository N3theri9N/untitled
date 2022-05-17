const express = require('express');
const app = express();
const morgan = require('morgan');
morgan('tiny')

/*app.use(() => {
    console.log("HEYYY!!!")
})*/

/*app.use((req, res, next) => {
    console.log("THIS IS MY FIRST MIDDLEWARE!!!");
    return next();
})

app.use((req, res, next) => {
    console.log("THIS IS MY SECOND MIDDLEWARE!!!");
    next();
})*/

const verifyPassword = (req, res, next)=>{
    const { password } = req.query;
    if(password === "chickennugget"){
        return next();
    }
    res.send("SORRY YOU NEED A PASSWORD!!")
}

app.use((req, res, next) => {
    //req.method = 'GET'
    req.requstTime = Date.now();
    console.log(req.method, req.path);
    next();
})

app.use(morgan('tiny'))
//app.use(morgan('common'))

app.get('/', (req, res) => {
    console.log(req.requstTime);
    res.send('HOME PAGE!');
})

app.use('/dogs', (req, res, next) => {
    console.log("I love dogs");
    next();
})

app.get('/dogs', (req, res) => {
    console.log(req.requstTime);
    res.send('WOOF WOOF');
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send('MY SECRET');
})

app.use((req, res)=>{
    res.status(404).send("NOT FOUND");
})

app.listen(3000, () => {
    console.log('App is running on localhost:3000');
})