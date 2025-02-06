import { getEnv } from "../utils/get-env";

const appConfig = () => ({
  NODE_ENV: getEnv("NODE_ENV", "development"),
  PORT: getEnv("PORT", "5000"),
  BASE_PATH: getEnv("BASE_PATH", "/api"),
  MONGO_URI: getEnv("MONGO_URI", "mongodb+srv://lansarbacoro:pE7REcgzxUAJSG4R@cluster0.h9wed.mongodb.net/teammanger_db"),

  SESSION_SECRET: getEnv("SESSION_SECRET"," "),
  SESSION_EXPIRES_IN: getEnv("SESSION_EXPIRES_IN", " "),

  JWT_SECRET: getEnv("JWT_SECRET","jesuislansarbacoro"),

  JWT_EXPIRES_IN:getEnv("JWT_EXPIRES_IN","86400"),

  GOOGLE_CLIENT_ID: getEnv("GOOGLE_CLIENT_ID", "228067421877-gvkmtljjbld8cmmsrk692r1n0n4abdu7.apps.googleusercontent.com"),
  GOOGLE_CLIENT_SECRET: getEnv("GOOGLE_CLIENT_SECRET","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"),
  GOOGLE_CALLBACK_URL: getEnv("GOOGLE_CALLBACK_URL","http://localhost:5000/api/auth/google/callback"),

  FRONTEND_ORIGIN: getEnv("FRONTEND_ORIGIN", "https://effisyncrea.vercel.app/"),
  FRONTEND_GOOGLE_CALLBACK_URL: getEnv("FRONTEND_GOOGLE_CALLBACK_URL","https://effisyncrea.vercel.app/google/oauth/callback"),
});

export const config = appConfig();