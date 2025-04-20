import mongoose, { Schema } from "mongoose";

const groupSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    groupImage: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Group = mongoose.model("Group", groupSchema);
