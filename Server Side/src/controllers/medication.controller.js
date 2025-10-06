import User from "../models/user.model.js"
import Medication from "../models/medication.model.js"
import {addMedToCalendar} from "../utils/addToCalendar.utils.js"

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
        await addMedicationToCalendar(user, newEntry);
        return res.status(200).json({message: "Medication Added Successfully!!"});
    } catch (error) {
        return res.status(400).json({message: "Error in adding medication ",error});
    }
}

const upcoming = async (req, res) => {
  try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(400).json({ message: "Invalid User" });

        const now = new Date();
        const currentHour = String(now.getHours()).padStart(2, "0");
        const currentMinute = String(now.getMinutes()).padStart(2, "0");
        const currentTime = `${currentHour}:${currentMinute}`;

        const upcomingmeds = await Medication.find({
        userId: req.userId,
        time: { $gt: currentTime }
        });

        upcomingmeds.sort((a, b) => {
        return a.time.localeCompare(b.time);
        });

        return res.status(200).json(upcomingmeds);
  } catch (error) {
        return res
        .status(400)
        .json({ message: "Error in fetching upcoming meds ", error });
  }
};
export {addMedication, upcoming};