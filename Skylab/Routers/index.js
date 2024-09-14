const express=require("express");
const router = express.Router();

//routers 
const PostRouter = require("./post.js")
const UsersRouter = require("./user.js")

//private route
router.use("/post",PostRouter)

router.use("/auth",UsersRouter)



module.exports = router;
