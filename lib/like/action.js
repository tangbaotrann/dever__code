"use server";

import { revalidatePath } from "next/cache";

import connectToDB from "../db";
import { Like, Post } from "../models";
import { routes } from "@/routes";

// like
const addLike = async (post, session) => {
  const { _id } = post;
  const { user } = session;
  try {
    await connectToDB();

    const like = new Like({
      postId: _id,
      email: user.email,
    });

    await like.save();

    // find blog -> to push field: likes[]
    const blog = await Post.findById({ _id: _id });

    if (blog) {
      await blog.likes.push(like);

      await blog.save();
    }
  } catch (err) {
    console.log(err);
  }

  revalidatePath(`${routes.BLOG_URL}/${_id}`);
};

// un-like
const unLike = async (post, session) => {
  const { _id } = post;
  const { user } = session;

  try {
    await connectToDB();

    // find post
    const post = await Post.findById({ _id: _id }).populate("likes");

    if (post) {
      const like = post.likes.find((like) => like.email === user.email);

      // delete like -> model 'Like'
      if (like) {
        await Like.findByIdAndDelete({ _id: like._id });
      }

      const index = post.likes.findIndex((like) => like.email === user.email);

      // delete like -> model 'Post' with field: likes[]
      if (index > -1) {
        post.likes.splice(index, 1);

        await post.save();
      }
    }
  } catch (err) {
    console.log(err);
  }

  revalidatePath(`${routes.BLOG_URL}/${_id}`);
};

export { addLike, unLike };
