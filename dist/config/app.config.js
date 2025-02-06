"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const get_env_1 = require("../utils/get-env");
const appConfig = () => ({
    NODE_ENV: (0, get_env_1.getEnv)("NODE_ENV", "development"),
    PORT: (0, get_env_1.getEnv)("PORT", "5000"),
    BASE_PATH: (0, get_env_1.getEnv)("BASE_PATH", "/api"),
    MONGO_URI: (0, get_env_1.getEnv)("MONGO_URI", "mongodb+srv://lansarbacoro:pE7REcgzxUAJSG4R@cluster0.h9wed.mongodb.net/teammanger_db"),
    SESSION_SECRET: (0, get_env_1.getEnv)("SESSION_SECRET", " "),
    SESSION_EXPIRES_IN: (0, get_env_1.getEnv)("SESSION_EXPIRES_IN", " "),
    JWT_SECRET: (0, get_env_1.getEnv)("JWT_SECRET", "jesuislansarbacoro"),
    JWT_EXPIRES_IN: (0, get_env_1.getEnv)("JWT_EXPIRES_IN", "86400"),
    GOOGLE_CLIENT_ID: (0, get_env_1.getEnv)("GOOGLE_CLIENT_ID", "228067421877-gvkmtljjbld8cmmsrk692r1n0n4abdu7.apps.googleusercontent.com"),
    GOOGLE_CLIENT_SECRET: (0, get_env_1.getEnv)("GOOGLE_CLIENT_SECRET", "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"),
    GOOGLE_CALLBACK_URL: (0, get_env_1.getEnv)("GOOGLE_CALLBACK_URL", "http://localhost:5000/api/auth/google/callback"),
    FRONTEND_ORIGIN: (0, get_env_1.getEnv)("FRONTEND_ORIGIN", "https://effisyncrea.vercel.app/"),
    FRONTEND_GOOGLE_CALLBACK_URL: (0, get_env_1.getEnv)("FRONTEND_GOOGLE_CALLBACK_URL", "https://effisyncrea.vercel.app/google/oauth/callback"),
});
exports.config = appConfig();
