"use server";

const { signIn, signOut } = require("@/app/auth");

// login with credentials
const loginUserWithCredentials = async (prev, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username: username, password: password });
  } catch (err) {
    console.log(err);
    return {
      error: "Login to failed !!",
    };
  }
};

// login with github
const loginUserWithGithub = async () => {
  const type = "github";

  await signIn(type);
};

// logout
const logoutUser = async () => {
  await signOut();
};

export { loginUserWithCredentials, loginUserWithGithub, logoutUser };
