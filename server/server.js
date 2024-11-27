require('dotenv').config();
const mongoose=require('./src/config/db');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
let express= require('express');
let app=express();
const userRoutes=require('./src/routes/user_routes');
let port=8000;
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use('/api',userRoutes);
app.listen(port,()=>{
    console.log("Listening to the port 8000");
})