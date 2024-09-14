const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const mainRoute = require("./Routers/index.js")
dotenv.config()

const app = express();

app.use(express.json())
app.use(cors());

//connecting to mongodb
const connect = async () => {
try{
    await mongoose.connect(process.env.MONGO_URL)
    console.log("connected to mongodb")
}
catch(error){
    throw error
}

}



app.use("/api", mainRoute);




app.listen(process.env.PORT,async ()=>{
  await connect()
    console.log(`server working on ${process.env.PORT} port `)
})





