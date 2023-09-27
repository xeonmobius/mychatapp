import mongoose from "mongoose";

const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
      default: "https://cdn-icons-png.flaticon.com/512/1144/1144760.png",
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("User", userModel);

export default Users;
