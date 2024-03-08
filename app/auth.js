import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import connectToDB from "../lib/db";
import { User } from "../lib/models";
import { authConfig } from "@/app/auth.config";

// Login with account credentials
const login = async (credentials) => {
  try {
    await connectToDB();

    const user = await User.findOne({ username: credentials.username });

    if (!user) {
      throw new Error("Wrong credentials !");
      // return {
      //   error: "Thông tin đăng nhập không chính xác. Vui lòng thử lại!",
      // };
    }

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new Error("Wrong credentials !");
      // return { error: "Mật khẩu không đúng. Vui lòng thử lại!" };
    }

    return user;
  } catch (err) {
    console.log(err);
    // return {
    //   error:
    //   "Đăng nhập không thành công. Vui lòng thử lại! (Hoặc có thể liên hệ qua mail: tangbaotrann@gmail.com để được mình hỗ trợ nhé.)",
    // };
    throw err;
  }
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth((req) => {
  return {
    ...authConfig,
    providers: [
      // Login with Github account
      GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      // Login with Google account
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      // Login with Credentials account
      CredentialsProvider({
        async authorize(credentials) {
          try {
            const user = await login(credentials);

            return user;
          } catch (err) {
            return null;
          }
        },
      }),
    ],
    callbacks: {
      async signIn({ user, account, profile }) {
        const GITHUB = "github";
        const GOOGLE = "google";
        console.log("--> 77 [PROFILE]", profile);
        if (account.provider === GITHUB) {
          try {
            await connectToDB();

            const user = await User.findOne({ email: profile.email });

            // console.log("----> 78 [USER GITHUB] ->", user);

            if (!user) {
              const newUser = new User({
                username: profile.login,
                email: profile.email,
                image: profile.avatar_url,
              });

              await newUser.save();
            }
          } catch (err) {
            console.log(err);
            return false;
          }
        } else if (account.provider === GOOGLE) {
          try {
            await connectToDB();

            const user = await User.findOne({ email: profile.email });

            // console.log("----> 102 [USER GOOGLE] ->", user);

            if (!user) {
              const newUser = new User({
                username: profile.name,
                email: profile.email,
                image: profile.picture,
              });

              await newUser.save();
            }
          } catch (err) {
            console.log(err);
            return false;
          }
        }

        return true;
      },
      ...authConfig.callbacks,
    },
  };
});
