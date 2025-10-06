import express from "express";
import cors from "cors";
import authRouter from "../src/routes/auth.route.js"
import medicationRouter from "../src/routes/medication.route.js"
import cookieParser from "cookie-parser";
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/", authRouter);
app.use("/user", medicationRouter);
export default app;

