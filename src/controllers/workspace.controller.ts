import { Request, Response } from "express";

import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import {
  
    changeRoleSchema,
  createWorkspaceSchema,
  workspaceIdSchema,

} from "../validation/workspace.validation";
import { HTTPSTATUS } from "../config/http.config";
import { changeMemberService, createWorkspaceService, getAllWorkspaceUserService, getWorkspaceAnalyticsService, getWorkspaceByIdService, getWorkspaceMembersService } from "../services/workspace.service";
import { getMemberRoleInWorkspace } from "../services/member.service";
import { Permissions } from "../enums/role.enum";
import { roleGuard } from "../utils/roleGuard";



export const createWorkspaceController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = createWorkspaceSchema.parse(req.body);

    const userId = req.user?._id;
    const { workspace } = await createWorkspaceService(userId, body);

    return res.status(HTTPSTATUS.CREATED).json({
      message: "Workspace created successfully",
      workspace,
    });
  }
);

export const getUserMemberWorkspaceController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const { workspaces } = await getAllWorkspaceUserService(userId);

    return res.status(HTTPSTATUS.OK).json({
      message: "Workspace fetch successfully",
      workspaces,
    });
  }
);

export const getWorkspaceByIdController = asyncHandler(
    async (req: Request, res: Response) => {
        const workspaceId = workspaceIdSchema.parse(req.params.id);
        const userId = req.user?._id;
    
        await getMemberRoleInWorkspace(userId, workspaceId);
    
        const { workspace } = await getWorkspaceByIdService(workspaceId);
    
        return res.status(HTTPSTATUS.OK).json({
          message: "Workspace fetched successfully",
          workspace,
        });
      }
);


export const getWorkspaceMembersController = asyncHandler(
    async (req: Request, res: Response) => {
      const workspaceId = workspaceIdSchema.parse(req.params.id);
      const userId = req.user?._id;
  
      const { role } = await getMemberRoleInWorkspace(userId, workspaceId);
      roleGuard(role, [Permissions.VIEW_ONLY]);
  
      const { members, roles } = await getWorkspaceMembersService(workspaceId);
  
      return res.status(HTTPSTATUS.OK).json({
        message: "Workspace members retrieved successfully",
        members,
        roles,
      });
    }
  );

export const getWorkspaceAnalyticsController = asyncHandler(
    async (req: Request, res: Response) => {
      const workspaceId = workspaceIdSchema.parse(req.params.id);
      
      const userId = req.user?._id;
  
      const { role } = await getMemberRoleInWorkspace(userId, workspaceId);
     roleGuard(role, [Permissions.VIEW_ONLY]);
    
     const {analytics} = await getWorkspaceAnalyticsService(workspaceId);
      return res.status(HTTPSTATUS.OK).json({
        message: "Workspace analytics retrieved successfully",
        analytics,
      });
    }
  );

  export const changeMemberRoleController = asyncHandler(
    async (req: Request, res: Response) => {
        const workspaceId = workspaceIdSchema.parse(req.params.id);

        const {memberId, roleId} = changeRoleSchema.parse(req.body);

        const userId = req.user?._id;
        const { role } = await getMemberRoleInWorkspace(userId, workspaceId);

        roleGuard(role, [Permissions.CHANGE_MEMBER_ROLE]);

         const { member } = await changeMemberService(
            memberId,
            workspaceId,
            roleId,
         );
    
        return res.status(HTTPSTATUS.OK).json({
            message: "Member role changed successfully",
            member,
        });
  });

