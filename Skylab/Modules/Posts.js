const mongoose = require("mongoose");



const postsSchema = mongoose.Schema(
    {
    id:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
    })


    const Posts = mongoose.model("posts",postsSchema)

    module.exports = Posts