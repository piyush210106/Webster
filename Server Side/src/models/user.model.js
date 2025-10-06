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
        },
        google: {
            google_accessToken: { type: String },
            google_refreshToken: { type: String },
            expiryDate: { type: Date }, 
    },
    }, 
    {
        timestamps: true
    })

const User = mongoose.model("User", userSchema);
export default User;