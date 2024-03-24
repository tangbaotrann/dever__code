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
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const likeSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models?.User || mongoose.model("User", userSchema);

export const Post = mongoose.models?.Post || mongoose.model("Post", postSchema);

export const Comment =
  mongoose.models?.Comment || mongoose.model("Comment", commentSchema);

export const Like = mongoose.models?.Like || mongoose.model("Like", likeSchema);
