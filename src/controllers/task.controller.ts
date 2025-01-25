import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { Request, Response } from "express";
import { createTaskSchema, taskIdSchema, updateTaskSchema } from "../validation/task.validation";
import { projectIdSchema } from "../validation/project.validation";
import { workspaceIdSchema } from "../validation/workspace.validation";
import { getMemberRoleInWorkspace } from "../services/member.service";
import { roleGuard } from "../utils/roleGuard";
import { Permissions } from "../enums/role.enum";
import { HTTPSTATUS } from "../config/http.config";
import { createTaskService, updateTaskService } from "../services/task.service";

export const createTaskController = asyncHandler(
    async (req: Request, res: Response) => {
      const userId = req.user?._id;
  
      const body = createTaskSchema.parse(req.body);
      const projectId = projectIdSchema.parse(req.params.projectId);
      const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
  
      const { role } = await getMemberRoleInWorkspace(userId, workspaceId);
      roleGuard(role, [Permissions.CREATE_TASK]);
  
      const { task } = await createTaskService(
        workspaceId,
        projectId,
        userId,
        body
      );
  
      return res.status(HTTPSTATUS.OK).json({
        message: "Task created successfully",
        task,
      });
    }
  );

export const updateTaskController = asyncHandler(
    async(req: Request, res: Response) => {
        const userId = req.user?._id;
        const body = updateTaskSchema.parse(req.body);

        const taskId = taskIdSchema.parse(req.params.id);

        const projectId = projectIdSchema.parse(req.params.projectId);
        const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
        

        const { role } = await getMemberRoleInWorkspace(userId, workspaceId);
        roleGuard(role, [Permissions.EDIT_TASK]);

        const { updatedTask } = await updateTaskService(
            workspaceId,
            projectId,
            taskId,
            body
        );

        return res.status(HTTPSTATUS.OK).json({
            message: "Task updated successfully",
            task: updatedTask
        })

    }
)