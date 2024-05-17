const mongoose=require("mongoose");

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGOOSE_URI);

        const connection=mongoose.connection;

        connection.on('connected',()=>{
            console.log("Successfully connected to the DB")
        })
        connection.on('error',(error)=>{
            console.log('something went wrong',error)
        })
    } catch (error) {
        console.log('Something has gone wrong',error);
    }
}


module.exports=connectDB;