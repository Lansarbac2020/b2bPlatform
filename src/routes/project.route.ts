import { Router } from "express";
import { createProjectController, getAllProjectsController, getProjectAnalyticsController, getProjectsByIdAndWorkspaceController } from "../controllers/project.controller";

const projectRoutes = Router();


//create project
projectRoutes.post("/workspace/:workspaceId/create", createProjectController);

// GET /api/projects
projectRoutes.get("/workspace/:workspaceId/all", getAllProjectsController);

//get single project
projectRoutes.get("/:id/workspace/:workspaceId", getProjectsByIdAndWorkspaceController);

projectRoutes.get(
    "/:id/workspace/:workspaceId/analytics",
    getProjectAnalyticsController
  );

export default projectRoutes;