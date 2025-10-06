import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    pillName:{
        type: String,
        required: true
    },
    dosage:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true,
        trim: true
    }
}, {timestamps: true}
);

const Medication = mongoose.model("Medication", medicationSchema);

export default Medication;