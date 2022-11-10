const express = require('express');
const router = express.Router();
const loginController = require("../controllers/loginController")
const studentController = require("../controllers/studentController")
const userController = require("../controllers/userController")
const authentication = require("../Middlewares/auth")

router.post("/login" , loginController.loginUser)

router.post("/createUser" , userController.createUser)

router.post("/createStudent", authentication.authentication,  studentController.createStudent)

router.get("/getStudents", authentication.authentication,studentController.getStudents)

router.put("/updateStudent/:id" ,authentication.authentication, studentController.updateStudent)

router.delete("/deleteStudent/:id" ,authentication.authentication, studentController.deleteStudent)



module.exports = router;