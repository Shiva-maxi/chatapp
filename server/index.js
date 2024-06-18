const express=require("express");
const cors=require("cors");
const cookieparser=require('cookie-parser');
const connectDB=require('./config/connectDB');
const router=require('./routes/index');
const {app,server}=require('./socket/index')
require("dotenv").config();
 

const port=process.env.PORT ||8080;

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials: true
}))
app.use(express.json());
app.use(cookieparser());
app.use('/api',router);
app.use('/',(req,res)=>{
    res.send('HELLO');
})

connectDB().then(()=>{
    server.listen(port,()=>{
        console.log('server running at port',port);
    })
})
