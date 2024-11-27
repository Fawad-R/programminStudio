const mongoose = require('mongoose');
// mongoose.connect(`mongodb+srv://user:user@movieswebsite.vcren.mongodb.net/?retryWrites=true&w=majority&appName=moviesWebsite`);
mongoose.connect(process.env.DBURL);
const db=mongoose.connection;
db.on('error',console.error.bind(console,'Mongo db connection error'))
db.once('open',()=>{
    console.log('Connected to MONGO DB!');
    
})