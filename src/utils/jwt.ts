import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
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
const expiresInSeconds = 86400;
if (isNaN(expiresInSeconds)) {
  console.error('Invalid JWT_EXPIRES_IN configuration');

  console.log(expiresInSeconds);
}
console.log(expiresInSeconds);
export const accessTokenSignOptions: SignOptsAndSecret = {
  expiresIn: expiresInSeconds,
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
export const verifyJwtToken = <TPayload extends object = AccessTPayload>(
    token: string,
    options?: VerifyOptions & { secret: string }
  ) => {
    try {
      const { secret = config.JWT_SECRET, ...opts } = options || {};
      const payload = jwt.verify(token, secret, {
        ...defaults,
        ...opts,
      }) as TPayload;
      return { payload };
    } catch (err: any) {
      return {
        error: err.message,
      };
    }
  };
