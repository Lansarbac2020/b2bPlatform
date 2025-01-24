import { Router } from "express";
import { changeMemberRoleController, createWorkspaceController, deleteWorkspaceByIdController, getUserMemberWorkspaceController, getWorkspaceAnalyticsController, getWorkspaceByIdController, getWorkspaceMembersController, updateWorkspaceByIdController } from "../controllers/workspace.controller";

const workspaceRoutes = Router();
 workspaceRoutes.post("/create/new", createWorkspaceController);

 workspaceRoutes.put("/update/:id", updateWorkspaceByIdController);

 workspaceRoutes.put("/change/member/role/:id",
     changeMemberRoleController
);

 workspaceRoutes.delete("/delete/:id", deleteWorkspaceByIdController);

 workspaceRoutes.get("/all", getUserMemberWorkspaceController);

 workspaceRoutes.get("/members/:id", getWorkspaceMembersController);

 workspaceRoutes.get("/analytics/:id", getWorkspaceAnalyticsController);

 workspaceRoutes.get("/:id", getWorkspaceByIdController);
  


 export default workspaceRoutes;

