"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = getEnv;
// export const getEnv = (key: string, defaultValue: string = ""): string => {
//     const value = process.env[key];
//     if (value === undefined) {
//       if (defaultValue) {
//         return defaultValue;
//       }
//       throw new Error(`Enviroment variable ${key} is not set`);
//     }
//     return value;
//   };
function getEnv(key, defaultValue) {
    const value = process.env[key];
    if (value === undefined || value === null || value === "") {
        if (defaultValue !== undefined) {
            return defaultValue;
        }
        throw new Error(`Environment variable ${key} is not set`);
    }
    return value;
}
