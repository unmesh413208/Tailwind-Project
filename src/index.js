const express = require("express")
const app = express()
const mongoose = require("mongoose")
app.use(express.json())
const route = require('./routes/route.js');


app.use('/', route) 

mongoose.connect("mongodb+srv://unmesh_dhore:Kundan%4012345@cluster0.szcbzir.mongodb.net/TailWebs",{
    useNewUrlParser:true
})
.then(()=> console.log("Mongodb is connected"))
.catch((err)=>{console.log(err);})

app.listen(process.env.PORT || 5000, function(){
    console.log("Express app is running on the PORT"+(5000||process.env.PORT));
})

