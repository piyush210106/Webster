import { google } from "googleapis";
import User from "../models/user.model.js";

const getGoogleClient = async(userId) => {
    const user = User.findById(userId);
    if(!user || !user.google) throw new Error("Google account not linked");

    const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:8000/auth/google/callback"
    );

    oAuth2Client.setCredentials({
    access_token: user.google.accessToken,
    refresh_token: user.google.refreshToken,
    expiry_date: user.google.expiryDate ? new Date(user.google.expiryDate).getTime() : null
    });

    oAuth2Client.on("tokens", async (tokens) => {
    if (tokens.access_token) user.google.accessToken = tokens.access_token;
    if (tokens.refresh_token) user.google.refreshToken = tokens.refresh_token;
    if (tokens.expiry_date) user.google.expiryDate = tokens.expiry_date;
    await user.save();
    });
}

const addMedToCalendar = async(user, med) => {
    const auth = await getGoogleClient(user.userId);
    const calendar = google.calendar({ version: "v3", auth });

    const today = new Date().toISOString().split("T")[0]; 
    const startTime = new Date(`${today}T${med.time}:00`);
    const endTime = new Date(startTime.getTime() + 30 * 60000);

    const event = {
    summary: `Take ${med.pillName} (${med.dosage})`,
    description: "Medication Reminder from DoseMaster App",
    start: { dateTime: startTime.toISOString(), timeZone: "Asia/Kolkata" },
    end: { dateTime: endTime.toISOString(), timeZone: "Asia/Kolkata" },
    reminders: {
      useDefault: false,
      overrides: [
        { method: "popup", minutes: 5 },
        { method: "email", minutes: 10 },
      ],
    },
  };

  const response = await calendar.events.insert({
    calendarId: "primary",
    resource: event,
  });

  console.log("Event created:", response.data.htmlLink);
}

const rescheduleMed = async(user, med) => {
    const auth = await getGoogleClient(user.userId);
    const calendar = google.calendar({ version: "v3", auth });

    const now = new Date();
    const startTime = new Date(now.getTime() + 30 * 60000);
    const endTime = new Date(startTime.getTime() + 30 * 60000);

    const event = {
    summary: `Take ${med.pillName} (${med.dosage})`,
    description: "Medication Reminder from DoseMaster App",
    start: { dateTime: startTime.toISOString(), timeZone: "Asia/Kolkata" },
    end: { dateTime: endTime.toISOString(), timeZone: "Asia/Kolkata" },
    reminders: {
      useDefault: false,
      overrides: [
        { method: "popup", minutes: 5 },
        { method: "email", minutes: 10 },
      ],
    },
  };

  const response = await calendar.events.insert({
    calendarId: "primary",
    resource: event,
  });

  console.log("Event created:", response.data.htmlLink);
}


export {addMedToCalendar, rescheduleMed};