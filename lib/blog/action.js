"use server";

import { revalidatePath } from "next/cache";

import connectToDB from "../db";
import { Like, Post } from "../models";
import { routes } from "@/routes";
import { DEFAULT_NUM_PAGINATION } from "@/utils/constants";

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

// list blog post by email user
const likedBlogPostByEmailUser = async (email, q, page, sort) => {
  const regexTitle = new RegExp(q, "i");
  const ITEM_PER_PAGE = DEFAULT_NUM_PAGINATION;

  try {
    await connectToDB();

    if (email) {
      const likes = await Like.find({ email: email })
        .populate({
          path: "postId",
          match: {
            title: { $regex: regexTitle },
            isDeleted: { $ne: true },
          },
        })
        .sort({ createdAt: sort === "asc" ? "asc" : "desc" })
        .limit(ITEM_PER_PAGE)
        .skip(ITEM_PER_PAGE * (page - 1));

      // count
      const count = await Like.find({ email: email })
        .populate({
          path: "postId",
          match: {
            title: { $regex: regexTitle },
            isDeleted: { $ne: true },
          },
        })
        .countDocuments();

      const totalPages = Math.ceil(count / ITEM_PER_PAGE);

      if (likes.length > 0) {
        const customFormat = likes
          .filter((_like) => _like.postId !== null)
          .map((like) => {
            return {
              isDeleted: like.postId.isDeleted,
              _id: like.postId._id,
              title: like.postId.title,
              desc: like.postId.desc,
              images: like.postId.images,
              comments: like.postId.comments,
              likes: like.postId.likes,
              userId: like.postId.userId,
              createdAt: like.postId.createdAt,
              updatedAt: like.postId.updatedAt,
            };
          });

        return { liked: customFormat, count, totalPages };
      }
    }
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch blog post by email user!!!");
  }
};

export {
  saveBlog,
  updateBlog,
  deleteBlog,
  fetchPostById,
  likedBlogPostByEmailUser,
};
