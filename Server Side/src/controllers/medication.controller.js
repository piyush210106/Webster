import User from "../models/user.model.js"
import Medication from "../models/medication.model.js"

const addMedication = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if(!user) return res.status(400).json({message: "Invalid User"});

        const {userId, pillName, dosage, time} = req.body;
        if(!userId || !pillName || !dosage || !time) return res.status(400).json({message: "All fields are required!!"});

        let newEntry = new Medication({
            userId: req.userId,
            pillName,
            dosage,
            time
        });
        await newEntry.save();
        return res.status(200).json({message: "Medication Added Successfully!!"});
    } catch (error) {
        return res.status(400).json({message: "Error in adding medication ",error});
    }
}

const upcoming = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if(!user) return res.status(400).json({message: "Invalid User"});

        const now = new Date();
        const currentHour = String(now.getHours()).padStart(2,"0");
        const currentMin  = String(now.getMinutes()).padStart(2,"0");
        const currentTime = `${currentHour}:${currentMin}`;

        const meds = await Medication.find({ userId: req.userId });

        let upcoming = [];

        meds.forEach(med => {
        const futureTimes = med.time.filter(t => t > currentTime);
        futureTimes.forEach(t => {
            upcoming.push({
            pillName: med.pillName,
            dosage: med.dosage,
            time: t
            });
        });
        });

        upcoming.sort((a, b) => a.time.localeCompare(b.time));

        return res.status(200).json(upcoming);        
    } catch (error) {
        return res.status(400).json({message: "Error in fetching upcoming meds ",error});
    }
}
export {addMedication, upcoming};