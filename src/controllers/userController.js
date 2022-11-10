const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")

const createUser = async (req,res)=>{
    try{
        //taking the data from the request body
        let data = req.body

        const passwordHash = await bcrypt.hash(data.password,10)
        data.password = passwordHash
        //create a new user in the userModel
        let savedData = await userModel.create(data)

        res.status(201).send({status:true,message:"User created successfully",data:savedData})
    }
    catch(err){
        res.status(500).send({msg:"Serverside Errors. Please try again later", error: err.message})
    }
}


module.exports.createUser = createUser