 
import bcrypt from "bcrypt";
import User from "../schema/schema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import newIncome from "../schema/incomeSchema.js";
import Income from "../schema/incomeSchema.js";
import Expense from "../schema/expenseSchema.js";
import { sendActivationEmail , sendForgotPasswordEmail} from "../services/service.js";
import crypto from "crypto";


dotenv.config();

const userController = {

    signup : async (req, res) => {
        try {
            const { name, username, email, password, activated } = req.body;

            // Check if the user already exists
            const userExists = await User.findOne({ username });

            if (userExists) {
                return res.status(400).json({ message: "User already exists" });
            }

            // Hash the password
            const passwordHash = await bcrypt.hash(password, 10);

            // Create a new user
            const newUser = new User({
                name,
                username,
                email,
                password: passwordHash,
                activated: false,
            });

            // Save the user
            await newUser.save();
//  const activationLink = `${req.protocol}://${req.get("host")}/activate/${newUser._id}`;
            const emailSent = await sendActivationEmail(newUser.email);

            if (emailSent) {
                return res.status(201).json({
                    success: true,
                    message: "Successfully registered..",
                    user: {
                        _id: newUser._id,
                        name: newUser.name,
                        username: newUser.username,
                        email: newUser.email,
                        activated: true
                    },
                });
            } else {
                throw new Error("Failed to send confirmation email");
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: "Internal Server Error while signing up" });
        }
    },


   


          

    login: async (req, res) => {
        try {
            // Get the user data from the request body
            const { username, password } = req.body;

            // Check if the user exists
            const userExists = await User.findOne({ username });

            //if user does not exist, return an error
            if (!userExists) {
                return res.status(400).json({ message: "User does not exist or invalid credentials" });
            }

            // Check if the password is correct
            const isPasswordCorrect = await bcrypt.compare(password, userExists.password);

            // If password is incorrect, return an error
            if (!isPasswordCorrect) {
                return res.status(400).json({ message: "Incorrect Password" });

            }

            //if the password is correct generate token

            const token = jwt.sign({
                id: userExists._id,
                name: userExists.name,
                email: userExists.email,
            }, process.env.JWT_SECRET)


            // setting cookie with token
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            });

            res.status(200).json({ message: "Logged In Successfully", token });

           

        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
    
    getuser: async (req, res) => {
        try {
            // Get the user ID from the request object (assuming it's set by verifyToken middleware)
            const userId = req.id;

            // Get user from the database using findById method (assuming you have a User model)
            const user = await User.findById(userId).select('-password -__v -_id'); // Exclude password, __v, and _id

            // If user is found, send it in the response
            if (user) {
                res.status(200).json({ message: 'User found', user });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    //forgot password
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;

            // Check if the email exists in your database
            const user = await User.findOne({ email });

            if (user) {
                // Generate a password reset token/link 
                const passwordResetToken = crypto.randomBytes(32).toString('hex');

                // Send the forgot password email
                const resetLink = `${req.protocol}://${req.get("host")}/reset-password?email=${email}&token=${passwordResetToken}`;
                const emailSent = await sendForgotPasswordEmail(email, resetLink);

                if (emailSent) {
                    res.status(200).json({ message: "Forgot password email sent successfully" });
                } else {
                    throw new Error("Failed to send forgot password email");
                }
            } else {
                return res.status(400).json({ message: "Email is not registered" });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: "Internal Server Error while processing forgot password request" });
        }
    },

    // forgotPassword: async (req, res) => {
    //     try {
    //         const { email } = req.body;
    //         // Check if the email exists in your database
    //         if (email === User.email) { 
    //             // Generate a password reset token/link 
    //             const passwordResetToken = crypto.randomBytes(32).toString('hex');

    //             // Send the forgot password email
    //             const resetLink = `${req.protocol}://${req.get("host")}/reset-password?email=${email}&token=${passwordResetToken}`;
    //             const emailSent = await sendForgotPasswordEmail(email, resetLink);

    //             if (emailSent) {
    //                 res.status(200).json({ message: "Forgot password email sent successfully" });
    //             } else {
    //                 throw new Error("Failed to send forgot password email");
    //             }
    //         }
    //         else(!email) 
    //             return res.status(400).json({ message: "Email is not registered" });
            

         
    //     } catch (error) {
    //         console.error("Error:", error);
    //         res.status(500).json({ message: "Internal Server Error while processing forgot password request" });
    //     }
    // },


    newIncome: async (req, res) => {
        try {
            // Validation
            const { amount, category, description } = req.body;
            if (!amount || !category || !description) {
                return res.status(400).json({ message: "All fields are required" });
            }

            console.log("Creating new income...");

            // Create new income
            const addIncome = new newIncome({
                amount,
                category,
                description,
                //date
            });

            console.log("Saving new income...");

            // Save new income
            await addIncome.save();

            console.log("Income added successfully");

            // Respond with success message and new income
            res.status(200).json({ message: "Income added successfully", addIncome });
        } catch (error) {
            console.error("Error in newIncome:", error);
            res.status(500).json({ message: "Internal Server Error in newIncome" });
        }
    },

    updateIncome: async (req, res) => {
        try {
            // Validation
            const { id } = req.params;
            console.log("id:", id);

            // Find the income by ID
            const income = await Income.findById(id);
            console.log("income found:", income);

            // Check if income exists
            if (!income) {
                return res.status(404).json({ message: "Income not found" });
            }

            // Update income
            const updatedIncome = await Income.findByIdAndUpdate(id, req.body, { new: true });
            console.log("updated income:", updatedIncome);

            // Respond with success message and updated income
            res.status(200).json({ message: "Income updated successfully", updatedIncome });
        } catch (error) {
            console.error("Error in updateIncome:", error);
            res.status(500).json({ message: "Internal Server Error in updateIncome" });
        }
    },

   
    allincomedata: async (req, res) => {
        try {
            // Get all incomes from the database
            const incomes = await Income.find({});

            console.log("incomes found:", incomes);

            // Check if incomes exist
            if (!incomes || incomes.length === 0) {
                return res.status(404).json({ message: "Incomes not found" });
            }

            // Respond with success message and all income data
            res.status(200).json({ message: "All Income Data", incomes });
        } catch (error) {
            console.error("Error in allincomedata:", error);
            res.status(500).json({ message: "Internal Server Error in AllIncomeData" });
        }
    },

    deleteIncome: async (req, res) => {
        try {
            const { id } = req.params;
        
            //check if income exists
            const income = await Income.findById(id);
            if (!income) {
                return res.status(404).json({ message: "Income not found" });
            }

            //delete income
            const deletedIncome = await Income.findByIdAndDelete(id);

            //check if income was deleted or not
            if (deletedIncome) {
                res.status(200).json({ message: "Income deleted successfully", deletedIncome });
            } else {
                res.status(500).json({ message: "Internal Server Error in deleteIncome" });
            }


        } catch (error) {
            res.status(500).json({ message: "Internal Server Error in deleteIncome or check the id" });
        }
    },

    createExpense: async (req, res) => {
        try {
            // Validation
            const { title, price, quantity, date, category, description } = req.body;
            if (!title || !price || !quantity || !date || !category || !description) {
                return res.status(400).json({ message: "All fields are required" });
            }

            // Calculate total price 
            const totalPrice = price * quantity;

            // Create new expense
            const newExpense = new Expense({
                title,
                price,
                quantity,
                date,
                category,
                description,
                totalPrice
            });

            // Save new expense
            const savedExpense = await newExpense.save();

            // Respond with success message and saved expense
            res.status(200).json({ message: "Expense created successfully", expense: savedExpense });
        } catch (error) {
            console.error("Error in createExpense:", error);
            res.status(500).json({ message: "Internal Server Error in createExpense" });
        }
    },

    getAllExpense : async (req, res) => {
        try {
            const expenses = await Expense.find();
            res.status(200).json({ expenses });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    //delete expense

    deleteExpense: async (req, res) => {
        const { id } = req.params;
        try {
            const deletedExpense = await Expense.findByIdAndDelete(id);
            if (!deletedExpense) {
                return res.status(404).json({ message: "Expense not found" });
            }
            res.status(200).json({ message: "Expense deleted successfully", expense: deletedExpense });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    //update expense

    updateExpense: async (req, res) => {
        const { id } = req.params;
        try {
            const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedExpense) {
                return res.status(404).json({ message: "Expense not found" });
            }
            res.status(200).json({ message: "Expense updated successfully", expense: updatedExpense });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }





    

};


export default userController