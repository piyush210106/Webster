import User from "../models/user.model.js";
import Medication from "../models/medication.model.js";
import Log from "../models/log.model.js";
import { rescheduleMed } from "../utils/addToCalendar.utils.js";

const addLog = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(400).json({ message: "Invalid User" });

    const { medicationId, time, status } = req.body;
    if (!medicationId || !time) {
      return res.status(400).json({ message: "Medication ID and time are required" });
    }

    const med = await Medication.findById(medicationId);
    if (!med) return res.status(404).json({ message: "Medication not found" });

    const log = new Log({
      userId: req.userId,
      medicationId,
      time,
      status: status || "taken"
    });

    if(status === "Missed") await rescheduleMed(user, med);
    await log.save();
    return res.status(201).json({ message: "Log saved", log });
  } catch (error) {
    return res.status(500).json({ message: "Error saving log", error });
  }
};

const getLogs = async (req, res) => {
  try {
    const logs = await Log.find({ userId: req.userId })
      .populate("medicationId", "pillName dosage") 
      .sort({ createdAt: -1 });

    return res.status(200).json(logs);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching logs", error });
  }
};

export {getLogs, addLog};
