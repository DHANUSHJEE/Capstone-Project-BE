import mongoose from "mongoose";

const userSchema = 
    new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true

        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: [6, "Password should be at least 6 characters"],
            trim: true
        },
        acctivated: {
            type: Boolean,
            default: false
        },
        token: {
            type: String,
            trim: true
        },
   

    }
    );
    
    


// module.exports = mongoose.model("user", userSchema, "users")

export default mongoose.model("user", userSchema, "users")