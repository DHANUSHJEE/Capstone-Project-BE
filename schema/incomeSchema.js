//using mongoose 
import mongoose from "mongoose";


//creating schema for income 
const incomeSchema = new mongoose.Schema({

    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    // date: {
    //     type: Date,
    //     default: Date.now
    // }

})


//exporting schema
export default mongoose.model("income", incomeSchema, "incomes")