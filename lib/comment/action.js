"use server";

import { revalidatePath } from "next/cache";

import connectToDB from "../db";
import { Comment, User } from "../models";
import { routes } from "@/routes";

// fetch comments find blog post id
const fetchCommentsByBlogPostId = async (post) => {
  const { _id } = post;

  try {
    if (_id) {
      await connectToDB();
      const comments = await Comment.find({
        postId: _id,
      })
        .populate("userId")
        .sort({ createdAt: "desc" });

      return comments;
    }
  } catch (err) {
    console.log(err);
  }
};

// add comment
const addComment = async (prev, formData) => {
  const { postId, content, email } = Object.fromEntries(formData);

  try {
    await connectToDB();

    // find user
    const user = await User.findOne({ email: email });

    const newComment = new Comment({
      postId: postId,
      content: content,
      email: email,
      userId: user._id,
    });

    newComment.save();
  } catch (err) {
    console.log(err);
  }

  revalidatePath(routes.BLOG_URL);
};

export { fetchCommentsByBlogPostId, addComment };
