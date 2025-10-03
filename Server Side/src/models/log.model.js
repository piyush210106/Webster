import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    medicationId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medication"
    },
    status:{
        type: String,
        enum: ["Taken", "Missed"],
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    }
}, {
    timestamps: true
});

const Log = mongoose.model("Log", logSchema);

export default Log;
