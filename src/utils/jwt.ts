import jwt, { SignOptions } from "jsonwebtoken";
import { UserDocument } from "../models/user.model"
import { config } from "../config/app.config";


export type AccessTPayload ={
    userId: UserDocument["_id"];

};

type SignOptsAndSecret = SignOptions &{
    secret: string;
};

const defaults: SignOptions={
    audience: ["user"],
};

// const expiresInSeconds = Number(config.JWT_EXPIRES_IN);
// if (isNaN(expiresInSeconds)) {
//     throw new Error('Invalid JWT_EXPIRES_IN configuration');
// }

// In your JWT utility file
export const accessTokenSignOptions: SignOptsAndSecret = {
    expiresIn: config.JWT_EXPIRES_IN,  // Keep as string/number from config
    secret: config.JWT_SECRET,
  };
  


export const signJwtToken =(
    payload: AccessTPayload,
    options?: SignOptsAndSecret
)=>{
    const {secret, ...opts} =options || accessTokenSignOptions;
    return jwt.sign(payload, secret, {
        ...defaults,...opts
    });
}
