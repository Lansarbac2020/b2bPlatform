import { Router } from "express";
import { createProjectController, deleteProjectController, getAllProjectsController, getProjectAnalyticsController, getProjectsByIdAndWorkspaceController, updateProjectController } from "../controllers/project.controller";

const projectRoutes = Router();


//create project
projectRoutes.post("/workspace/:workspaceId/create", createProjectController);

//update project
projectRoutes.put("/:id/workspace/:workspaceId/update", updateProjectController);

//delete project
projectRoutes.delete("/:id/workspace/:workspaceId/delete", deleteProjectController);

// GET /api/projects
projectRoutes.get("/workspace/:workspaceId/all", getAllProjectsController);

//get single project
projectRoutes.get("/:id/workspace/:workspaceId", getProjectsByIdAndWorkspaceController);

projectRoutes.get(
    "/:id/workspace/:workspaceId/analytics",
    getProjectAnalyticsController
  );

export default projectRoutes;