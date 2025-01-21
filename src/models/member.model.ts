import mongoose, { Document, Schema } from "mongoose";
import { RoleDocument } from "./roles-permission.model";

export interface MemberDocument extends Document {
    userId: mongoose.Types.ObjectId;
    workspaceId: mongoose.Types.ObjectId;
    joinedAt: Date;
    role: RoleDocument;

}
const memberSchema = new Schema<MemberDocument>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    role:{
        type:Schema.Types.ObjectId,
        ref: "Role",
        required: true,
    },
   
    joinedAt: {
        type: Date,
        //required: true,
        default: Date.now,
    },
 
})

const MemberModel = mongoose.model<MemberDocument>("Member", memberSchema);

export default MemberModel;