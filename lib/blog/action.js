"use server";

import { revalidatePath } from "next/cache";

import connectToDB from "../db";
import { Post } from "../models";
import { routes } from "@/routes";

// save blog
const saveBlog = async ({ model, listUrlImageFirebase, userId, title }) => {
  try {
    await connectToDB();

    const newBlog = new Post({
      desc: model,
      images: listUrlImageFirebase,
      userId: userId,
      title: title,
    });

    await newBlog.save();

    return { success: true };
  } catch (err) {
    console.log(err);
  }

  revalidatePath(routes.BLOG_URL);
};

// find post by id post
const fetchPostById = async (id) => {
  try {
    if (id) {
      await connectToDB();
      const res = await Post.findById(id);

      return res;
    }
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts!!!");
  }
};

export { saveBlog, fetchPostById };
