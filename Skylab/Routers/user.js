const Users = require("../Modules/User.js")
const express = require("express")
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken")
const router = express()
const { encrypt, decrypt } = require('node-encryption');


// /register 
router.post("/signup",async (req,res) => {


const {UserName,email,password} = req.body

const id = uuidv4()

const d = new Date()

const date = `${d.getUTCDate()} ${d.getUTCMonth()} ${d.getUTCFullYear()}`

 const Password = encrypt(password,process.env.ENCRYPT)


const newUsers = new Users({id,email,Password})
await newUsers.save()


const token = jwt.sign({id:id},process.env.JWT_KEY,{expiresIn:process.env.time})


res.status(201).json({
    token:token,
    email:email
})


})


// login


router.post("/login",async(req,res) => {
const {email,password} = req.body
console.log(req.body)


const user = await Users.findOne({email})

const decryptedPassword = decrypt(user.Password,process.env.ENCRYPT)
console.log(decryptedPassword.toString())

if(decryptedPassword.toString() === password)
{
    console.log("the user from login :",user)

        const token = jwt.sign({id:user.id},process.env.JWT_KEY,{expiresIn:'7h'})

        res.status(200).json({
            token:token,
            UserName:user.UserName,
            email:email,
            img:user.img

})
}else
{
    res.status(401).json({
        "error":"email or password is wrong"
    })
}

})


router.delete("/logout", (req,res) =>{
     
    try{
        const token = req.body.token

         jwt.verify(token,process.env.JWT_KEY,(err,decode) => {
            if(err)
                throw new Error("please login or register")
    
            res.status(200).json({"NewToken":""})
            
        })

       
    
    }catch(err)
    {
        res.json({"err":err.message})
    }



})







module.exports = router 
