import { Router } from "express";
import { createWorkspaceController } from "../controllers/workspace.controller";

const workspaceRoutes = Router();
 workspaceRoutes.post("/create/new", createWorkspaceController);

 export default workspaceRoutes;

