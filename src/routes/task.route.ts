import { Router } from "express";
import { createTaskController, updateTaskController } from "../controllers/task.controller";

const taskRoutes = Router();

// Define the task endpoints here


taskRoutes.post("/project/:projectId/workspace/:workspaceId/create",createTaskController);

//update tasks
taskRoutes.put("/:id/project/:projectId/workspace/:workspaceId/update",updateTaskController);

export default taskRoutes;