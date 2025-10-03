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
    time: []
}, {timestamps: true}
);

const Medication = mongoose.model("Medication", medicationSchema);

export default Medication;