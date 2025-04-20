import mongoose, { Schema } from "mongoose";

const groupMembershipSchema = new Schema(
  {
    // // todo : check best way to store Date on DB
    // joinedAt: {
    //   type: Date,
    //   required: true,
    // },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
  },
  { timestamps: true }
);

export const GroupMembership = mongoose.model(
  "GroupMembership",
  groupMembershipSchema
);
