const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")
const studentModel = require("../models/studentModel")


const authentication = async (req,res,next)=>{
    try{
    let token = req.headers["x-Api-key"]
    if(!token) token = req.headers["x-api-key"]

    if(!token){
        return res.status(400).send({status:false,message:"Please login again to generate the token"})
    }

    let decodedToken = jwt.verify(token,"Tailwebs Project")
    console.log(decodedToken.userId);

    if(!decodedToken){
        return res.status(401).send({status:false,message:"Authentication Missing. Login Required. Token is invalid"})
    }
    
let queryData = req.query 
let paramData = req.params.id
// console.log(paramData);
let userId = await studentModel.findById(paramData)
// console.log(userId.userId);
let userIdForAuth = (req.body.userId || queryData.userId || userId.userId )
    // console.log(userIdForAuth);
    let userLoggedIn = decodedToken.userId

    if(userIdForAuth!=userLoggedIn){
        return res.status(403).send({ status: false, msg: 'Not Authorized. User logged is not allowed to modify the requested users data' })
    }

    next()
}
catch(err){
    res.status(500).send({ msg: "Serverside Errors. Please try again later", error: err.message })
}
}


// const authorisation = async (req,res)=>{
    
// }




module.exports.authentication = authentication