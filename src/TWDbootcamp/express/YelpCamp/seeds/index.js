const mongoose = require('mongoose');
const Campground = require('../models/campground');

mongoose.connect('mongodb://root:root@localhost:27017/yelp-camp?authSource=admin&authMechanism=SCRAM-SHA-1', {
    useNewurlParser : true,
    useUnifiedTopology : true,
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open" , ()=>{
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    const cities = require('./cities');
    const {places, descriptors} = require('./seedHelper');

    for(let i = 0 ; i < 50 ; i ++){
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location : `${cities[random1000].city}, ${cities[random1000].state}`,
            title : `${sample(descriptors)} ${sample(places)}`,
        });
        await camp.save();
    }
}
//seedDB();