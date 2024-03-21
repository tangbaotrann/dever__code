import connectToDB from "./db";
import { Comment, Like, Post, User } from "./models";
import { DEFAULT_NUM_PAGINATION } from "@/utils/constants";

// fetch comments
const fetchComments = async () => {
  try {
    await connectToDB();
    const comment = await Comment.find();

    return comment;
  } catch (err) {
    console.error(err);
    throw new Error("Fetch Comments failed!!");
  }
};

// fetch likes
const fetchLikes = async () => {
  try {
    await connectToDB();
    const like = await Like.find();

    return like;
  } catch (err) {
    console.error(err);
    throw new Error("Fetch Likes failed!!");
  }
};

// fetch users
const fetchUsers = async () => {
  try {
    await connectToDB();
    const user = await User.find();

    return user;
  } catch (err) {
    console.log(err);
    throw new Error("FetchUsers failed !!");
  }
};

// fetch posts
const fetchPosts = async (q, page, sort) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = DEFAULT_NUM_PAGINATION;

  try {
    await connectToDB();

    const count = await Post.find({
      title: { $regex: regex },
      isDeleted: { $ne: true },
    }).countDocuments();

    const totalPages = Math.ceil(count / ITEM_PER_PAGE);

    const posts = await Post.find({
      title: { $regex: regex },
      isDeleted: { $ne: true },
    })
      .sort({ updatedAt: sort === "asc" ? "asc" : "desc" })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    return { posts, count, totalPages };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts!!!");
  }
};

export { fetchComments, fetchLikes, fetchUsers, fetchPosts };
