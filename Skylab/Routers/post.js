const express=require("express");
const posts = require("../Modules/Posts.js")
const router = express.Router()
const jwt = require("jsonwebtoken")



//create post
router.post("/",async (req,res) => {

    try{
        console.log("req",req.body)
        const {token,message} = req.body

        //when we generated the token we gave it the user id
        //so now we decode the token and got the id we send it now to use it for the post id so we know who posted by searching the id when we need
       jwt.verify(token,process.env.JWT_KEY,async(err,decode) => {
            if(err)
                throw new Error("please login or register")

            console.log("decode",decode)
            const id = decode.id
            const d = new Date()
    
            const date = `${d.getUTCDate()}-${d.getUTCMonth()}-${d.getUTCFullYear()}`
                
            const newPost = new posts({id,message})
            
            await newPost.save()
            
            res.status(201).json(newPost)
            
        })

    }
    catch(error)
    {
        console.log("hatta",error,"hatta")
        res.status(500).json({error: error.message});
    }

})

module.exports = router
