import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({

   
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: Date.now,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    }

})

//exporting the schema
export default mongoose.model("expense",expenseSchema,"expenses")