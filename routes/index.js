export const router = {
  HOME_URL: "/",
  ABOUT_URL: "/about",
  BLOG_URL: "/blog",
  REGISTER_URL: "/register",
  LOGIN_URL: "/login",
};

// Header links
const menus = [
  {
    title: "Blog",
    url: router.BLOG_URL,
  },
  {
    title: "Tóm tắt",
    url: router.ABOUT_URL,
  },
  {
    title: "Đăng nhập",
    url: router.LOGIN_URL,
  },
];

export default menus;
