import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      requried: true,
    },
    username: {
      type: String,
      requried: true,
      unique: true,
    },
    password: {
      type: String,
      requried: true,
      minlength: 6,
      default: "",
    },
    gender: {
      type: String,
      requried: true,
      enum: ["male", "female"],
    },
    profilePic: {
      type: String,
      requried: false,
      default: "",
    },
  },
  { timestamps: true } // createdAt, updatedAt in DB
);

const User = mongoose.model("User", userSchema);
export default User;
