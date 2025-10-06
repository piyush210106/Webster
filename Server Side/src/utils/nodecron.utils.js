import cron from "node-cron";
import Medication from "../models/medication.model.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,      
    pass: process.env.EMAIL_PASS, 
  },
});

cron.schedule("* * * * *", async () => {
  const now = new Date();
  const currentHour = String(now.getHours()).padStart(2, "0");
  const currentMin = String(now.getMinutes()).padStart(2, "0");
  const currentTime = `${currentHour}:${currentMin}`;

  console.log("Cron running at:", currentTime);

  const meds = await Medication.find().populate("userId");

  for (const med of meds) {
      if (med.time === currentTime) {
        const user = med.userId;
        if (user && user.email) {
          await transporter.sendMail({
            from: process.env.EMAIL,
            to: user.email,
            subject: "Medication Reminder",
            text: `Hi ${user.name}, it's time to take your ${med.pillName} (${med.dosage}) at ${t}.`,
          });

          console.log(`Reminder sent to ${user.email} for ${med.pillName} at ${t}`);
        }
      }
  }
});
