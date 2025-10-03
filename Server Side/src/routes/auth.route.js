import { Router } from "express";
import {askConsent, userLogin} from "../controllers/user.controller.js"

const authRouter = Router();

authRouter.route("/auth/google").get(askConsent);
authRouter.route("/auth/google/callback").get(userLogin);

export default authRouter;