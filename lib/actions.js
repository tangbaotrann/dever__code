"use server";

import bcrypt from "bcryptjs";

const { signIn, signOut } = require("@/app/auth");
import connectToDB from "./db";
import { User } from "./models";

// user registration
const registerUser = async (prev, formData) => {
  const { username, password, email, confirmPassword, image } =
    Object.fromEntries(formData);

  if (
    username === "" ||
    password === "" ||
    email === "" ||
    confirmPassword === ""
  )
    return { error: "Vui lòng nhập đầy đủ thông tin!" };

  if (password.length < 6) return { error: "Mật khẩu phải lớn hơn 6 ký tự!" };

  if (password !== confirmPassword)
    return { error: "Mật khẩu và mật khẩu nhập lại không khớp!" };

  try {
    await connectToDB();

    const user = await User.findOne({ username: username });

    if (user)
      return {
        error: "Tài khoản đã tồn tại. Vui lòng đăng ký tài khoản khác!",
      };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      image,
    });

    await newUser.save();

    return { success: true };
  } catch (err) {
    console.log(err);
    return {
      error:
        "Đăng ký không thành công. Vui lòng kiểm tra lại! (Hoặc có thể liên hệ qua mail này: tangbaotrann@gmail.com để được mình hỗ trợ nhé.)",
    };
  }
};

// login with credentials
const loginUserWithCredentials = async (prev, formData) => {
  const { username, password } = Object.fromEntries(formData);

  if (username === "" || password === "")
    return { error: "Vui lòng nhập đầy đủ thông tin!" };

  try {
    await signIn("credentials", { username: username, password: password });
  } catch (err) {
    console.log(err);
    if (err?.type?.includes("CredentialsSignin")) {
      return { error: "Tên hoặc mật khẩu của bạn không chính xác!" };
    }
    throw err;
  }
};

// login with github
const loginUserWithGithub = async () => {
  const type = "github";

  await signIn(type);
};

// login with google
const loginUserWithGoogle = async () => {
  const type = "google";

  await signIn(type);
};

// logout
const logoutUser = async () => {
  await signOut();
};

export {
  registerUser,
  loginUserWithCredentials,
  loginUserWithGithub,
  loginUserWithGoogle,
  logoutUser,
};
