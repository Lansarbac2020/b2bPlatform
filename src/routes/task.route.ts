import { Router } from "express";
import { createTaskController, deleteTaskController, getAllTasksController, getTaskByIdController, updateTaskController } from "../controllers/task.controller";

const taskRoutes = Router();

// Define the task endpoints here


taskRoutes.post("/project/:projectId/workspace/:workspaceId/create",createTaskController);

//update tasks
taskRoutes.put("/:id/project/:projectId/workspace/:workspaceId/update",updateTaskController);

//all tasks
taskRoutes.get("/workspace/:workspaceId/all",getAllTasksController);
//get task by id

taskRoutes.get("/:id/project/:projectId/workspace/:workspaceId", getTaskByIdController);

//delete task

taskRoutes.delete("/:id/workspace/:workspaceId/delete", deleteTaskController);

export default taskRoutes;