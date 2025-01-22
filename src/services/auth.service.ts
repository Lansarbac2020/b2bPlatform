import mongoose from "mongoose";
import UserModel from "../models/user.model";
import AccountModel from "../models/account.model";
import WorkspaceModel from "../models/workspace.model";
import RoleModel from "../models/roles-permission.model";
import { Roles } from "../enums/role.enum";
import { NotFoundException } from "../utils/appError";
import MemberModel from "../models/member.model";

export const loginOrCreateAccountService=async(data:{
    provider: string;
    displayName:string;
    providerId: string;
    email?: string;
    picture?: string;
})=>{
    const {provider,providerId,email,picture,displayName}=data ;

    const session= await mongoose.startSession();
    try {
        session.startTransaction();
        console.log('Session started...');


        let user = await UserModel.findOne({email}).session(session);

        if (!user) {
            //create the user if not existing
            user = new UserModel({
                email,
                name:displayName,
                profilePicture:picture || null,
            });
            await user.save({session});

        const account = new AccountModel({
           
            userId:user._id,
            provider:provider,
            providerId:providerId,
       
        }) ;
        await account.save({session});
        //create new workspace for the new user
        const workspace = new WorkspaceModel({
            name: `My workspace`,
            description: `Workspace created for ${user.name}`,
            owner: user._id,
        });
        await workspace.save({session});

        const ownerRole = await RoleModel.findOne({
            name: Roles.OWNER,
        }).session(session);

        if (!ownerRole) {
            throw new NotFoundException("Owner role not found");
        }
        const member= new MemberModel({
            userId:user._id,
            workspaceId:workspace._id,
            role:ownerRole._id,
            joinedAt:new Date(),
        });
        await member.save({session});

        user.currentWorkspace = workspace._id as mongoose.Types.ObjectId;
        await user.save({session});
        }
        await session.commitTransaction();
        session.endSession();
        console.log('Session commited...');
        return {user};
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        //console.log(error);
        throw error;
    }finally{
        session.endSession();
    }
};