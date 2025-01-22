import { config } from "../config/app.config";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { Request, Response, NextFunction } from "express";
import { registerSchema } from "../validation/auth.validation";
import { HTTPSTATUS } from "../config/http.config";
import { registerUserService } from "../services/auth.service";
import passport from "passport";

export const googleLoginCallback = asyncHandler(
    async (req: Request, res: Response) => {
      const currentWorkspace = req.user?.currentWorkspace;
  
      if (!currentWorkspace) {
        return res.redirect(
          `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`
        );
      }
  
      return res.redirect(
        `${config.FRONTEND_ORIGIN}/workspace/${currentWorkspace}`
      );
    }
  );


export const registerUserController= asyncHandler(
  async (req: Request, res: Response) => {
     const body = registerSchema.parse({
      ...req.body,
     });

     await registerUserService(body);

     return res.status(HTTPSTATUS.CREATED).json({
       message: "User registered successfully"
     })
  }
)  


export const loginUserController= asyncHandler(
  async (req: Request, res: Response, next:NextFunction) => {
    passport.authenticate("local",(
      err:Error | null,
      user:Express.User | false,
      info: {message:string} | undefined
    )=>{
      if(err){
        return next(err);
      }
      if(!user){
        return res.status(HTTPSTATUS.UNAUTHORIZED).json({
          message:info?.message || "Invalid credentials"
        });
      }
      req.login(user,(error)=>{
        if(error){
          return next(error);
        }
        return res.status(HTTPSTATUS.OK).json({
          message:"Login successfully",
          user
        });
      });
    }
   )(req,res,next);

    }
)
//logout
export const logOutController = asyncHandler(
  async (req: Request, res: Response) => {
    req.logout((err) => {
      if (err) {
        console.error("Logout error:", err);
        return res
          .status(HTTPSTATUS.INTERNAL_SERVER_ERROR)
          .json({ error: "Failed to log out" });
      }
    });

    req.session = null;
    return res
      .status(HTTPSTATUS.OK)
      .json({ message: "Logged out successfully" });
  }
);