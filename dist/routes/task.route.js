"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = require("../controllers/task.controller");
const taskRoutes = (0, express_1.Router)();
// Define the task endpoints here
taskRoutes.post("/project/:projectId/workspace/:workspaceId/create", task_controller_1.createTaskController);
//update tasks
taskRoutes.put("/:id/project/:projectId/workspace/:workspaceId/update", task_controller_1.updateTaskController);
//all tasks
taskRoutes.get("/workspace/:workspaceId/all", task_controller_1.getAllTasksController);
//get task by id
taskRoutes.get("/:id/project/:projectId/workspace/:workspaceId", task_controller_1.getTaskByIdController);
//delete task
taskRoutes.delete("/:id/workspace/:workspaceId/delete", task_controller_1.deleteTaskController);
exports.default = taskRoutes;
