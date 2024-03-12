import connectToDB from "./db";
import { Post, User } from "./models";
import { DEFAULT_NUM_PAGINATION } from "@/utils/constants";

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

const fetchPosts = async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = DEFAULT_NUM_PAGINATION;

  try {
    await connectToDB();

    const count = await Post.find({
      title: { $regex: regex },
    }).countDocuments();

    const totalPages = Math.ceil(count / ITEM_PER_PAGE);

    const posts = await Post.find({
      title: { $regex: regex },
    })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    return { posts, count, totalPages };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts!!!");
  }
};

export { fetchUsers, fetchPosts };
