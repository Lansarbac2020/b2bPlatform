"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_controller_1 = require("../controllers/project.controller");
const projectRoutes = (0, express_1.Router)();
//create project
projectRoutes.post("/workspace/:workspaceId/create", project_controller_1.createProjectController);
//update project
projectRoutes.put("/:id/workspace/:workspaceId/update", project_controller_1.updateProjectController);
//delete project
projectRoutes.delete("/:id/workspace/:workspaceId/delete", project_controller_1.deleteProjectController);
// GET /api/projects
projectRoutes.get("/workspace/:workspaceId/all", project_controller_1.getAllProjectsController);
//get single project
projectRoutes.get("/:id/workspace/:workspaceId", project_controller_1.getProjectsByIdAndWorkspaceController);
projectRoutes.get("/:id/workspace/:workspaceId/analytics", project_controller_1.getProjectAnalyticsController);
exports.default = projectRoutes;
