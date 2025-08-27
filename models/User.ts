import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      require: true,
      type: String,
      trim: true,
    },

    email: {
      require: true,
      type: String,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },

  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
