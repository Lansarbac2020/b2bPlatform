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
  )=>{
    
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
     workspaceId: workspaceId
    });

    if (!member) {
        throw new NotFoundException("Member not found in the workspace");
    }

    member.role = role;
    await member.save();

    return { member };
  };