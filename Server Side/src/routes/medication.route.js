import { Router } from "express";
import { upcoming,addMedication } from "../controllers/medication.controller.js";
import {refreshTokens} from "../middlewares/refreshToken.middleware.js";
import { talkBot } from "../controllers/chatbot.controller.js";
import { addLog, getLogs } from "../controllers/log.controller.js";

const medicationRouter = Router();

medicationRouter.route("/home").post(refreshTokens, addMedication);
medicationRouter.route("/home").get(refreshTokens, upcoming);
medicationRouter.route("/stats").get(refreshTokens, getLogs);
medicationRouter.route("/logs").get(refreshTokens, getLogs);
medicationRouter.route("/logs").post(refreshTokens, addLog);
medicationRouter.route("/chatbot").post(refreshTokens, talkBot);

export default medicationRouter;