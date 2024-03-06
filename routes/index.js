export const constants = {
  HOME: "Trang chủ",
  BLOG: "Blog",
  SUMMARY: "Tóm tắt",
  LOGIN: "Đăng nhập",
  LOGOUT: "Đăng xuất",
};

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
    title: constants.HOME,
    url: router.HOME_URL,
  },
  {
    title: constants.SUMMARY,
    url: router.ABOUT_URL,
  },
  {
    title: constants.BLOG,
    url: router.BLOG_URL,
  },
];

export default menus;
