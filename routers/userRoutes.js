import express from "express";
import userController from "../controllers/userController.js";
import auth from "../auth/auth.js";


const router = express.Router();

//define endpoints

//register new user 
router.post("/signup", userController.signup)
//login the user
router.post("/login", userController.login)
//get user details
router.get("/getuser", auth.verifyToken, userController.getuser)
//forgot password
router.post("/forgotpassword", userController.forgotPassword)
//create new income
router.post("/newincome", auth.verifyToken, userController.newIncome)
//update income using id
router.put("/updateincome/:id", auth.verifyToken, userController.updateIncome)
//get all income data
router.get("/allincomedata", auth.verifyToken, userController.allincomedata)
//delete income using id
router.delete("/deleteincome/:id", auth.verifyToken, userController.deleteIncome)
//router for create expense
router.post("/createexpense", auth.verifyToken, userController.createExpense)
//router get all expenses
router.get("/allexpenses", auth.verifyToken, userController.getAllExpense)
//router for delete expense
router.delete("/deleteexpense/:id", auth.verifyToken, userController.deleteExpense)
//edit expense
router.put("/updateexpense/:id", auth.verifyToken, userController.updateExpense)

//export router
export default router