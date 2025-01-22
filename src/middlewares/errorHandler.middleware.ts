import { ErrorRequestHandler, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { AppError } from "../utils/appError";
import { ZodError } from "zod";
import { ErrorCodeEnum } from "../enums/error-code.enum";


const formatZodError=(res: Response, error:ZodError)=>{
   const errors =error?.issues.map((err) => ({
       field: err.path.join('.'),
       message: err.message
   }));
   return res.status(HTTPSTATUS.BAD_REQUEST).json({
     message: 'Validation failed',
     errors:errors,
     errorCode:ErrorCodeEnum.VALIDATION_ERROR
   });
}

export const errorHandler:ErrorRequestHandler=(
    error,
    req,
    res,
    next
):any=>{
    console.error(`error occured on PATH:${req.path}`,error);

    if(error instanceof SyntaxError)
  {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
     message:error.message,
     error:'Invalid request syntax'
   });
   } 

   if(error instanceof ZodError){
    return formatZodError(res,error);
   }

   if(error instanceof AppError){

    return res.status(error.statusCode).json({
     message:error.message,
     error:'Invalid request syntax'
   });
   }
  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
     message:error.message,
     error:error?.message||'Unknown error occured'
   })
}