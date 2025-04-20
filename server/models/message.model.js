import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export const GroupMembership = mongoose.model("Message", messageSchema);
