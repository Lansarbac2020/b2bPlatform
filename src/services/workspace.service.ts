import mongoose from "mongoose";
import { Roles } from "../enums/role.enum";
import MemberModel from "../models/member.model";
import RoleModel from "../models/roles-permission.model";
import UserModel from "../models/user.model";
import WorkspaceModel from "../models/workspace.model";
import { BadRequestException, NotFoundException } from "../utils/appError";
import TaskModel from "../models/task.model";
import { TaskStatusEnum } from "../enums/task.enum";
import ProjectModel from "../models/project.model";
import exp from "constants";

//********************************
// CREATE NEW WORKSPACE
//**************** **************/
export const createWorkspaceService = async (
  userId: string,
  body: {
    name: string;
    description?: string | undefined;
  }
) => {
  const { name, description } = body;

  const user = await UserModel.findById(userId);

  if (!user) {
    throw new NotFoundException("User not found");
  }

  const ownerRole = await RoleModel.findOne({ name: Roles.OWNER });

  if (!ownerRole) {
    throw new NotFoundException("Owner role not found");
  }

  const workspace = new WorkspaceModel({
    name: name,
    description: description,
    owner: user._id,
  });

  await workspace.save();

  const member = new MemberModel({
    userId: user._id,
    workspaceId: workspace._id,
    role: ownerRole._id,
    joinedAt: new Date(),
  });

  await member.save();

  user.currentWorkspace = workspace._id as mongoose.Types.ObjectId;
  await user.save();

  return {
    workspace,
  };
};

//********************************
// GET ALL WORKSPACE
//**************** **************/
export const getAllWorkspaceUserService = async (userId: string) => {
    const memberships = await MemberModel.find({ userId })
    .populate("workspaceId")
    .select("-password")
    .exec();

  // Extract workspace details from memberships
  const workspaces = memberships.map((membership) => membership.workspaceId);

  return { workspaces };
}

//****************************************************************
// get WORKSPACE by ID service
//****************************************************************
export const getWorkspaceByIdService = async (workspaceId: string) => {
    const workspace = await WorkspaceModel.findById(workspaceId);
  
    if (!workspace) {
      throw new NotFoundException("Workspace not found");
    }
  
    const members = await MemberModel.find({
      workspaceId,
    }).populate("role");
  
    const workspaceWithMembers = {
      ...workspace.toObject(),
      members,
    };
  
    return {
      workspace: workspaceWithMembers,
    };
  };

  //get all members of a workspace
  
export const getWorkspaceMembersService = async (workspaceId: string) => {
    // Fetch all members of the workspace
  
    const members = await MemberModel.find({
      workspaceId,
    })
      .populate("userId", "name email profilePicture -password")
      .populate("role", "name");
  
    const roles = await RoleModel.find({}, { name: 1, _id: 1 })
      .select("-permission")
      .lean();
  
    return { members, roles };
  };

  export const getWorkspaceAnalyticsService = async (workspaceId: string) => {
    const currentDate= new Date();
    const totalTasks = await TaskModel.countDocuments({ 
        workspaceId: workspaceId,
     });
     const overDueTasks = await TaskModel.countDocuments({
        workspaceId: workspaceId,
        dueDate:{$lt: currentDate },
        status: {$ne: TaskStatusEnum.DONE},
     });
     const completedTasks = await TaskModel.countDocuments({
        workspaceId: workspaceId,
        status: TaskStatusEnum.DONE,
     });
     const analytics={
            totalTasks,
            overDueTasks,
            completedTasks,
     };

     return {analytics};
  }

  export const changeMemberService= async(
  workspaceId: string,
  memberId: string,
  roleId: string
) => {
  const workspace = await WorkspaceModel.findById(workspaceId);
  if (!workspace) {
    throw new NotFoundException("Workspace not found");
  }

  const role = await RoleModel.findById(roleId);
  if (!role) {
    throw new NotFoundException("Role not found");
  }

  const member = await MemberModel.findOne({
    userId: memberId,
    workspaceId: workspaceId,
  });

  if (!member) {
    throw new Error("Member not found in the workspace");
  }

  member.role = role;
  await member.save();

  return {
    member,
  };
  };

  // update workspace details
  export const updateWorkspaceByIdService = async (
    workspaceId: string,
    name: string,
    description?: string
  ) => {
    const workspace = await WorkspaceModel.findById(workspaceId);
    if (!workspace) {
      throw new NotFoundException("Workspace not found");
    }
  
    // Update the workspace details
    workspace.name = name || workspace.name;
    workspace.description = description || workspace.description;
    await workspace.save();
  
    return {
      workspace,
    };
  };

  // delete workspace

  export const deleteWorkspaceService = async (
    workspaceId: string,
    userId: string
  ) => {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const workspace = await WorkspaceModel.findById(workspaceId).session(
        session
      );
      if (!workspace) {
        throw new NotFoundException("Workspace not found");
      }
  
      // Check if the user owns the workspace
      if (workspace.owner.toString() !== userId) {
        throw new BadRequestException(
          "You are not authorized to delete this workspace"
        );
      }
  
      const user = await UserModel.findById(userId).session(session);
      if (!user) {
        throw new NotFoundException("User not found");
      }
  
      await ProjectModel.deleteMany({ workspace: workspace._id }).session(
        session
      );
      await TaskModel.deleteMany({ workspace: workspace._id }).session(session);
  
      await MemberModel.deleteMany({
        workspaceId: workspace._id,
      }).session(session);
  
      // Update the user's currentWorkspace if it matches the deleted workspace
      if (user?.currentWorkspace?.equals(workspaceId)) {
        const memberWorkspace = await MemberModel.findOne({ userId }).session(
          session
        );
        // Update the user's currentWorkspace
        user.currentWorkspace = memberWorkspace
          ? memberWorkspace.workspaceId
          : null;
  
        await user.save({ session });
      }
  
      await workspace.deleteOne({ session });
  
      await session.commitTransaction();
  
      session.endSession();
  
      return {
        currentWorkspace: user.currentWorkspace,
      };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  };
