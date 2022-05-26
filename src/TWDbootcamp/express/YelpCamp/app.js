const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');

const campgrounds = require("./routes/campgrounds");
const reviews = require("./routes/reviews");

const ExpressError = require('./utils/ExpressError');
const session = require('express-session');
const flash = require('connect-flash');
/*
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewurlParser : true,
    useUnifiedTopology : true,
})

*/
mongoose.connect('mongodb://root:root@localhost:27017/yelp-camp?authSource=admin&authMechanism=SCRAM-SHA-1', {
    useNewurlParser : true,
    useUnifiedTopology : true,
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open" , ()=>{
    console.log("Database Connected");
});

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, 'public')))

const sessionConfig = {
  secret : 'thisshouldbeabettersecret!',
  resave : false,
  saveUninitialized : true,
  cookie : {
    expires : Date.now() + 1000 * 60 * 60 * 24 * 7
  }
}
app.use(session(sessionConfig))
app.use(flash());

app.get('/', (req, res) => {
    res.send('HELLO FROM YELP CAMP!')
})

app.use((req, res, next ) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    return next();
})

app.use('/campgrounds' , campgrounds);
app.use('/campgrounds/:id/reviews', reviews);

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})

app.use((err, req, res, next) => {
    const {statusCode = 500 } = err
    if(!err.message) err.message = "Something Went Wrong!";
    res.status(statusCode).render('error', { err });
})

/*
app.get('/makecampground', async (req, res) => {
    const camp = new Campground({title : 'My Backyard', description : 'cheap camping!'});
    await camp.save();
    res.send(camp);
});*/

app.listen(3000, () => {
    console.log('Serving on port 3000')
})