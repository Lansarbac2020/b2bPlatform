import { ErrorRequestHandler } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { AppError } from "../utils/appError";

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