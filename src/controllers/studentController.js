const studentModel = require("../models/studentModel")
const bcrypt = require("bcrypt")


const createStudent = async (req,res)=>{
    try {
        //getting student data from the req body

        let data = req.body
        console.log("our data is",data)

        //finding whether the name  and subject matches in our existing DB
        let findData = await studentModel.findOne({$and:[{name:data.name},{subject:data.subject}]})
        console.log(findData); 
        //if we find the document,then we update the marks
        if(findData !== null){
            let userId = findData._id
            console.log("userId is",userId);
            let marks = findData.marks + data.marks
            console.log("marks are", marks);
            data.marks = marks
            // data.userId = userId
            let updatedData = await studentModel.findByIdAndUpdate(
                 userId,
                {$set:{marks:marks}},
                {new:true}
                )
            res.status(201).send({status:true,message:"Student Data updated successfully",data:updatedData})
        }else{

        //saving student data in the studentModel
        let savedData = await studentModel.create(data)
        // console.log("this is it",savedData);
        res.status(201).send({status:true,message:"Student Data created successfully",data:savedData})
        }
    } catch (err) {
        res.status(500).send({msg:"Serverside Errors. Please try again later", error: err.message})
    }
}

const getStudents = async (req,res)=>{
    try{
    // getting the userId from the query
    let data = req.query
    //saving the userid in a variable
    let userId = data.userId

    //getting all the data from the backend of the logged in user    
    let savedData = await studentModel.find(data)
    res.status(200).send({status:true,returned_document: savedData.length ,data: savedData})
    }
    catch(err){
        res.status(500).send({msg:"Serverside Errors. Please try again later", error: err.message})
    }
}


const updateStudent = async (req,res)=>{
    try {
        let enteredStudentId = req.params.id 
        let updateData = await studentModel.findByIdAndUpdate(enteredStudentId,
            {$set:{name:req.body.name , subject:req.body.subject , marks:req.body.marks}},
            {new:true}
            )       
        res.status(201).send({status:true,message:"data updated succesfully",data:updateData})    

    } catch (err) {
        res.status(500).send({msg:"Serverside Errors. Please try again later", error: err.message})
    }
}




const deleteStudent = async (req,res)=>{
    let enteredStudentId = req.params.id

    let deletedData = await studentModel.deleteOne({enteredStudentId})
    res.status(201).send({status:true,message:"document deleted successfully",data:deletedData})
}



module.exports.createStudent = createStudent
module.exports.getStudents = getStudents
module.exports.updateStudent = updateStudent
module.exports.deleteStudent = deleteStudent