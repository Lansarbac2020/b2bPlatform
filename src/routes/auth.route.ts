import { Router } from "express";
import passport from "passport";
import { config } from "../config/app.config";
import { googleLoginCallback, loginUserController, logOutController, registerUserController } from "../controllers/auth.controller";


const failureUrl=`${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`;

const authRoutes= Router();

//register routes

authRoutes.post('/register',registerUserController);
//login
authRoutes.post('/login',loginUserController);
//lougout
authRoutes.post('/logout',logOutController);


// Authentication routes
authRoutes.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'],
    //session: false
    })
);

authRoutes.get(
    '/google/callback',
   passport.authenticate('google', { failureRedirect: failureUrl,
   
    }),
    googleLoginCallback
    );

export default authRoutes;