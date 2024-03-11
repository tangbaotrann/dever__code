import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 50,
    },
    password: {
      type: String,
      min: 6,
      max: 50,
    },
    image: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    numberVerify: {
      type: String,
      min: 6,
      max: 20,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const postSchema = new Schema(
  {
    title: {
      type: String,
    },
    desc: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models?.User || mongoose.model("User", userSchema);

export const Post = mongoose.models?.Post || mongoose.model("Post", postSchema);
