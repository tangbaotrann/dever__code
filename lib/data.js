import connectToDB from "./db";
import { Post, User } from "./models";

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

const fetchPosts = async () => {
  try {
    await connectToDB();
    const res = await Post.find();

    return res;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts!!!");
  }
};

export { fetchUsers, fetchPosts };
