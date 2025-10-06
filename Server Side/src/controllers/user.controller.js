import passport from "passport";
import User from "../models/user.model.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/callback",
    scope: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/calendar.events"
    ],
    accessType: "offline",
    prompt: "consent"
}, 
    async (accessToken, refreshToken, profile, next) => {
        try {
          let user = await User.findOne({google_id: profile.id});

          if(!user){
            user = await User.create({
                google_id: profile.id,
                email: profile.emails[0].value,
                name: profile.displayName,
                profile_pic: profile.photos[0].value,
                google: {
                    accessToken,
                    refreshToken,
                    expiryDate: new Date(Date.now() + 3600 * 1000) 
                }   
            });
          }

          return next(null, user);
        } catch (error) {
            return next(error, null);
        }
    }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id).then(user => done(null, user)));


const generateTokens = (user) => {
    let accessToken = jwt.sign({id: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30m"});
    let refreshToken = jwt.sign({id: user._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "10d"});

    return {accessToken, refreshToken};
}

const askConsent = (req, res, next) => {
    passport.authenticate( "google", {scope: [
    "profile",
    "email",
    "https://www.googleapis.com/auth/calendar.events"
    ]})(req, res, next);
    
}

const userLogin = (req, res, next) => {
    passport.authenticate("google", {session: false},
        async (err, user) => {
        const {accessToken, refreshToken} = generateTokens(user);

            user.refreshToken = refreshToken;
            await user.save();

            res
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
            })
            .cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: false,
            })
            res.redirect("http://localhost:5173/user/home");
        }
    )(req, res, next);
}

const userLogout = async (req, res) => {
    try {
        const accesstoken = req.cookies.accessToken;
        const refreshtoken = req.cookies.refreshToken;

        if(accesstoken){
            const decoded = jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRET);
            await User.findByIdAndUpdate(decoded.id, {refreshToken: null});
        }
        return res.clearCookie("refreshToken")
                  .clearCookie("accessToken")
                  .status(200);

    } catch (error) {
        return res.status(400).json({message: "User logout failed ", error}); 
    }
}


export {askConsent, userLogin, userLogout, generateTokens}