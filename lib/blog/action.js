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

export { saveBlog };
