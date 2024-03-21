"use server";

import { revalidatePath } from "next/cache";

import connectToDB from "../db";
import { Post } from "../models";
import { routes } from "@/routes";

// save blog
const saveBlog = async ({ model, listUrlImageFirebase, userId, title }) => {
  try {
    await connectToDB();

    const _newBlog = new Post({
      desc: model,
      images: listUrlImageFirebase,
      userId: userId,
      title: title,
    });

    await _newBlog.save();

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

    const _updateBlog = await Post.findOneAndUpdate(
      { _id: _id },
      {
        desc: model,
        images: listUrlImageFirebase,
        title: title,
      },
      { new: true }
    );

    return _updateBlog;
  } catch (err) {
    console.log(err);
  }

  revalidatePath(routes.BLOG_URL);
};

// delete blog post
const deleteBlog = async (prev, formData) => {
  const { id } = Object.fromEntries(formData);
  const isDeleted = true;

  try {
    await connectToDB();

    id &&
      (await Post.findOneAndUpdate(
        { _id: id },
        { $set: { isDeleted: isDeleted } }
      ));

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
      const res = await Post.findById(id).populate("likes");

      return res;
    }
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts!!!");
  }
};

export { saveBlog, updateBlog, deleteBlog, fetchPostById };
