import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        google_id:{
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        refreshToken: {
            type: String,
            required: false
        }
    }, 
    {
        timestamps: true
    })

const User = mongoose.model("User", userSchema);
export default User;