"use server";

import connectToDB from "../db";
import { Post } from "../models";

// save blog
const saveBlog = async ({ model, listUrlImageFirebase, userId }) => {
  try {
    await connectToDB();

    const newBlog = new Post({
      desc: model,
      images: listUrlImageFirebase,
      userId: userId,
    });

    await newBlog.save();

    return { success: true };
  } catch (err) {
    console.log(err);
  }
};

// find post by id post
const fetchPostById = async (id) => {
  // const { id } = params;

  console.log("---->", id);

  try {
    if (id) {
      await connectToDB();
      const res = await Post.findById(id);

      console.log("----> [POST]", res);

      return res;
    }
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts!!!");
  }
};

export { saveBlog, fetchPostById };
