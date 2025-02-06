"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signJwtToken = exports.accessTokenSignOptions = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_config_1 = require("../config/app.config");
const defaults = {
    audience: ["user"],
};
// const expiresInSeconds = Number(config.JWT_EXPIRES_IN);
// if (isNaN(expiresInSeconds)) {
//     throw new Error('Invalid JWT_EXPIRES_IN configuration');
// }
exports.accessTokenSignOptions = {
    expiresIn: Number(app_config_1.config.JWT_EXPIRES_IN), // Converts "86400" to 86400
    secret: app_config_1.config.JWT_SECRET,
};
const signJwtToken = (payload, options) => {
    const { secret, ...opts } = options || exports.accessTokenSignOptions;
    return jsonwebtoken_1.default.sign(payload, secret, {
        ...defaults, ...opts
    });
};
exports.signJwtToken = signJwtToken;
