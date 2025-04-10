import { model, Schema } from "mongoose";
import { ADMIN, USER } from "../util/constant.js";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: [ADMIN, USER],
      default: USER,
    },
  },
  { timestamps: true }
);

// Example of password hashing before saving (Mongoose middleware)
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    // Hash the password here using bcrypt or any other library
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export default model("User", userSchema);
