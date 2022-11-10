const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    marks:{
        type: Number,
        required:true
    },
    userId:{
        type: ObjectId
    }
},{timestamps:true})

module.exports = mongoose.model('student',studentSchema)