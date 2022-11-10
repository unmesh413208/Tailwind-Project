const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


const loginUser = async (req,res)=>{
    //checking if users credentials are correct or not
    let user = await userModel.findOne(req.body)
    if(!user){
        return res.send({status:false,message:"Bad request. Username or password is incorrect"})
    }
    
    // creating a jwt token
    let token = jwt.sign({
        userId:user._id.toString(),
        Project:"Tailwebs Project"
    },
    "Tailwebs Project"
    )
    // res.setHeaders()
    // setting token in header
    res.setHeader("x-api-key",token)
    res.send({status:true,data:token,message:"Login Successful"})
}


module.exports.loginUser = loginUser