import { Router } from "express";
import { changeMemberRoleController, createWorkspaceController, getUserMemberWorkspaceController, getWorkspaceAnalyticsController, getWorkspaceByIdController, getWorkspaceMembersController } from "../controllers/workspace.controller";

const workspaceRoutes = Router();
 workspaceRoutes.post("/create/new", createWorkspaceController);

 workspaceRoutes.put("/change/member/role/:id",
     changeMemberRoleController
);

 workspaceRoutes.get("/all", getUserMemberWorkspaceController);

 workspaceRoutes.get("/members/:id", getWorkspaceMembersController);

 workspaceRoutes.get("/analytics/:id", getWorkspaceAnalyticsController);

 workspaceRoutes.get("/:id", getWorkspaceByIdController);
  


 export default workspaceRoutes;

