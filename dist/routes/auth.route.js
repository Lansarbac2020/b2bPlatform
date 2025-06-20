"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const app_config_1 = require("../config/app.config");
const auth_controller_1 = require("../controllers/auth.controller");
const failureUrl = `${app_config_1.config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`;
const authRoutes = (0, express_1.Router)();
//register routes
authRoutes.post('/register', auth_controller_1.registerUserController);
//login
authRoutes.post('/login', auth_controller_1.loginUserController);
//lougout
authRoutes.post('/logout', auth_controller_1.logOutController);
// Authentication routes
authRoutes.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'],
    session: false
}));
authRoutes.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: failureUrl,
    session: false
}), auth_controller_1.googleLoginCallback);
exports.default = authRoutes;
