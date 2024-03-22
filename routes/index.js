export const constants = {
  HOME: "Trang chủ",
  BLOG: "Blog",
  SUMMARY: "Giới thiệu",
  LOGIN: "Đăng nhập",
  LOGOUT: "Đăng xuất",
  ADMIN: "Admin",
  LIKED: "Đã thích",
};

export const routes = {
  HOME_URL: "/",
  ABOUT_URL: "/about",
  BLOG_URL: "/blog",
  REGISTER_URL: "/register",
  LOGIN_URL: "/login",
  VERIFY_URL: "/verify",
  ADMIN_URL: "/admin",
  LIKED_URL: "/liked",
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
  {
    title: constants.LIKED,
    url: routes.LIKED_URL,
  },
];

export default menus;
