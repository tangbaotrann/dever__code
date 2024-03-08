export const constants = {
  HOME: "Trang chủ",
  BLOG: "Blog",
  SUMMARY: "Tóm tắt",
  LOGIN: "Đăng nhập",
  LOGOUT: "Đăng xuất",
};

export const routes = {
  HOME_URL: "/",
  ABOUT_URL: "/about",
  BLOG_URL: "/blog",
  REGISTER_URL: "/register",
  LOGIN_URL: "/login",
  VERIFY_URL: "/verify",
};

// Header links
const menus = [
  {
    title: constants.HOME,
    url: routes.HOME_URL,
  },
  {
    title: constants.SUMMARY,
    url: routes.ABOUT_URL,
  },
  {
    title: constants.BLOG,
    url: routes.BLOG_URL,
  },
];

export default menus;
