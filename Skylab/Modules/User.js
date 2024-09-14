const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
    id:{
        type:String,
        required:[true,"id is required"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"email is required"]
    },
    Password:{
        type:String,
        minlength:[6,"too short for password"],
        required:[true,"password  is required"]
    }
})


const Users = mongoose.model("Users",UsersSchema)

module.exports = Users