const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser('thisismysecret'))

app.get('/greet', (req, res) => {
  //console.log(req.cookies)
  const { name = 'No-name'} = req.cookies;
  res.send(`HEY THERE! ${name}`)
})

app.get('/setname', (req, res)=>{
  res.cookie('name', 'stevie'); // SET COOKIE
  res.cookie('animal', 'starfish');
  res.send('OK SENT YOU A COOKIE!!!');
})

app.get('/getsignedcookie', (req, res)=>{
  res.cookie('fruit', 'grape', {signed : true})
  res.send("SIGNED COOKIE!")
})

app.get('/verifyfruit', (req, res)=>{
  console.log(req.cookies)
  res.send(req.cookies);
})

app.listen(3000, () => {
  console.log("SERVING!");
})