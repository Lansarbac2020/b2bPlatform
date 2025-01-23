import { Router } from "express";
import { getCurrentUserController } from "../controllers/user.controller";

const userRoutes=Router();

//current user
userRoutes.get("/current", getCurrentUserController);

export default userRoutes;