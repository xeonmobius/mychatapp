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
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/1144/1144760.png",
    },
  },
  { timestamps: true }
);
userModel.methods.matchPassword = async function (enteredPassword: string) {
  return await Bun.password.verify(enteredPassword, this.password);
};
userModel.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await Bun.password.hash(this.password);
});

const Users = mongoose.model("User", userModel);

export default Users;
