"use server";

import bcrypt from "bcryptjs";
import { Resend } from "resend";

const { signIn, signOut } = require("@/app/auth");
import connectToDB from "./db";
import { User } from "./models";

// init resend
const resend = new Resend(process.env.RESEND_API_KEY);

// user registration
const registerUser = async (prev, formData) => {
  const { username, password, email, confirmPassword, image, isActive } =
    Object.fromEntries(formData);

  // check full fill
  if (
    username === "" ||
    password === "" ||
    email === "" ||
    confirmPassword === ""
  )
    return { error: "Vui lòng nhập đầy đủ thông tin!" };

  // check password
  if (password.length < 6) return { error: "Mật khẩu phải lớn hơn 6 ký tự!" };

  if (password !== confirmPassword)
    return { error: "Mật khẩu và mật khẩu nhập lại không khớp!" };

  try {
    await connectToDB();

    const __username = await User.findOne({ username: username });
    const __email = await User.findOne({ email: email });

    // check username
    if (__username)
      return {
        error: "Tên đã được sử dụng. Vui lòng chọn tên khác!",
      };

    // check email
    if (__email)
      return {
        error: "Email đã được đăng ký. Vui lòng chọn email khác!",
      };

    // hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // generate number verify
    const generateNumber = Math.floor(100000 + Math.random() * 900000);

    // send to email server
    await resend.emails.send({
      from: "Dever.code <no-reply@resend.dev>",
      to: email,
      subject:
        "Dever.code xin chào bạn. Cảm ơn bạn đã đăng ký tài khoản tại Dever.code.",
      html: `
        <b>Dưới đây là mã xác thực của bạn. Vui lòng không chia sẻ mã cho bất kỳ ai để tránh bị mất tài khoản nhé!</b>
        <p>Mã xác thực: <b>${generateNumber}</b></p>
      `,
    });

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      image,
      numberVerify: generateNumber,
      isActive: isActive,
    });

    await newUser.save();

    return { success: true };
  } catch (err) {
    console.log(err);
    return {
      error:
        "Đăng ký không thành công! (Nếu bạn gặp khó khăn trong quá trình đăng ký tài khoản, vui lòng liên hệ qua mail: tangbaotrann@gmail.com để được hỗ trợ nhanh nhé!",
    };
  }
};

// verify account
const verifyUser = async (prev, formData) => {
  const { email, numberVerify } = Object.fromEntries(formData);
  const isActive = true;

  // Check input full fill
  if (email === "" || numberVerify === "") {
    return { error: "Vui lòng nhập đầy đủ thông tin!" };
  }

  try {
    await connectToDB();

    const user = await User.findOne({ email: email });

    // Check user exists
    if (!user) {
      return {
        error: "Tài khoản không tồn tại. Không thể xác thực!",
      };
    }

    // Check number verify
    if (user?.numberVerify !== numberVerify) {
      return {
        error: "Mã xác thực không đúng!",
      };
    }

    // Check user already active
    if (user.isActive) {
      return {
        error: "Tài khoản đã được xác thực trước đó!",
      };
    }

    // updated field isActive
    user.isActive = isActive;

    await user.save();

    return { success: true };
  } catch (err) {
    console.log(err);
    return {
      error:
        "Xác thực tài khoản không thành công! (Nếu bạn gặp khó khăn trong quá trình xác thực tài khoản, vui lòng liên hệ qua mail: tangbaotrann@gmail.com để được hỗ trợ nhanh nhé!)",
    };
  }
};

// login with credentials
const loginUserWithCredentials = async (prev, formData) => {
  const { username, password } = Object.fromEntries(formData);

  // Check input full fill
  if (username === "" || password === "")
    return { error: "Vui lòng nhập đầy đủ thông tin!" };

  try {
    await connectToDB();

    const user = await User.findOne({ username: username });

    // Check user exists
    if (!user) {
      return {
        error: "Tài khoản không tồn tại",
      };
    }

    // Check account verify (isActive)
    if (!user.isActive) {
      return {
        error:
          "Tài khoản chưa được xác thực! (Nếu bạn gặp khó khăn trong quá trình xác thực tài khoản, vui lòng liên hệ qua mail: tangbaotrann@gmail.com để được hỗ trợ nhanh nhé!)",
      };
    }

    await signIn("credentials", {
      username: username,
      password: password,
    });
  } catch (err) {
    console.log(err);
    if (err?.type?.includes("CredentialsSignin")) {
      return {
        error: "Tên hoặc mật khẩu của bạn không chính xác.",
      };
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
  verifyUser,
  loginUserWithCredentials,
  loginUserWithGithub,
  loginUserWithGoogle,
  logoutUser,
};
