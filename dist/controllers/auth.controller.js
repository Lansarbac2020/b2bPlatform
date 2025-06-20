"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOutController = exports.loginUserController = exports.registerUserController = exports.googleLoginCallback = void 0;
const app_config_1 = require("../config/app.config");
const asyncHandler_middleware_1 = require("../middlewares/asyncHandler.middleware");
const auth_validation_1 = require("../validation/auth.validation");
const http_config_1 = require("../config/http.config");
const auth_service_1 = require("../services/auth.service");
const passport_1 = __importDefault(require("passport"));
const jwt_1 = require("../utils/jwt");
exports.googleLoginCallback = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const jwt = req.jwt;
    const currentWorkspace = req.user?.currentWorkspace;
    if (!jwt) {
        return res.redirect(`${app_config_1.config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`);
    }
    // return res.redirect(
    //   `${config.FRONTEND_ORIGIN}/workspace/${currentWorkspace}`
    // );
    return res.redirect(`${app_config_1.config.FRONTEND_GOOGLE_CALLBACK_URL}?status=success&access_token=${jwt}&current_workspace=${currentWorkspace}`);
});
exports.registerUserController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const body = auth_validation_1.registerSchema.parse({
        ...req.body,
    });
    await (0, auth_service_1.registerUserService)(body);
    return res.status(http_config_1.HTTPSTATUS.CREATED).json({
        message: "User registered successfully"
    });
});
exports.loginUserController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res, next) => {
    passport_1.default.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(http_config_1.HTTPSTATUS.UNAUTHORIZED).json({
                message: info?.message || "Invalid credentials"
            });
        }
        // req.login(user,(error)=>{
        //   if(error){
        //     return next(error);
        //   }
        //   return res.status(HTTPSTATUS.OK).json({
        //     message:"Login successfully",
        //     user
        //   });
        // });
        const access_token = (0, jwt_1.signJwtToken)({ userId: user._id });
        return res.status(http_config_1.HTTPSTATUS.OK).json({
            message: "Login successfully",
            access_token,
            user
        });
    })(req, res, next);
});
//logout
exports.logOutController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error("Logout error:", err);
            return res
                .status(http_config_1.HTTPSTATUS.INTERNAL_SERVER_ERROR)
                .json({ error: "Failed to log out" });
        }
    });
    req.session = null;
    return res
        .status(http_config_1.HTTPSTATUS.OK)
        .json({ message: "Logged out successfully" });
});
