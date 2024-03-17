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

// update blog
const updateBlog = async ({ _id, model, listUrlImageFirebase, title }) => {
  try {
    await connectToDB();

    const update = await Post.findOneAndUpdate(
      { _id: _id },
      {
        desc: model,
        images: listUrlImageFirebase,
        title: title,
      },
      { new: true }
    );

    return update;
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

export { saveBlog, updateBlog, fetchPostById };
