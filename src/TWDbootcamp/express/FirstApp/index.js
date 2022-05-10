const express = require("express");
const app = express();
//console.dir(app)

app.get('/cats', (req, res) => {
    res.send("MEOW!!")
})

app.post('/cats', (req, res) => {
    res.send("POST REQUEST TO /cats!! ")
})

app.get('/dogs', (req, res) => {
    res.send("WOOF!!")
})

app.get('/r/:subreddit', (req,res) => {
    const { subreddit } = req.params;
    res.send(`Browsing the ${subreddit} subreddit`)
});

app.get('/r/:subreddit/:postId', (req,res) => {
    const { subreddit, postId } = req.params;
    res.send(`Viewing Post ID : ${postId} on the ${subreddit} subreddit`)
});

app.get('/search', (req, res) => {
    const { q } = req.query;
    if(!q){
        res.send('NOTHING FOUND');
    }
    res.send(`Search results for : ${q}`);
})

app.get('*', (req, res) => {
    res.send(`I don't knot that path!`)
})

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000!")
})

/*

app.use((req, res)=> {
    console.log("WE GOT A NEW REQUEST!!");
    res.send({ color : 'red'});
})*/
