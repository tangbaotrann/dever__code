import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
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
      throw new Error("Wrong credentials!");
    }

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new Error("Wrong credentials!");
    }

    return user;
  } catch (err) {
    console.log(err);
    throw new Error(
      "Đăng nhập không thành công. Vui lòng thử lại! (Hoặc có thể liên hệ qua mail: tangbaotrann@gmail.com để được hỗ trợ nhé.)"
    );
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
      // Github account
      GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      // Login with account credentials
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
        console.log("--> 72 [PROFILE]", profile);
        if (account.provider === "github") {
          try {
            await connectToDB();

            const user = await User.findOne({ email: profile.email });

            console.log("----> 78 [USER] ->", user);

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
        }

        return true;
      },
      ...authConfig.callbacks,
    },
  };
});
