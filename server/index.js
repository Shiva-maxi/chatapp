const express=require("express");
const cors=require("cors");
const app=express();
const cookieparser=require('cookie-parser');
app.use(cookieparser());
const connectDB=require('./config/connectDB');
const router=require('./routes/index');

require("dotenv").config();
app.use(express.json());

const port=process.env.PORT ||3000;

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))

app.use('/api',router);
app.use('/',(req,res)=>{
    res.send('HELLO');
})

connectDB().then(()=>{
    app.listen(port,()=>{
        console.log('server running at port',port);
    })
})
