const routes = [
  {
    path: ["/", "/home"],
    exact: true,
    component: "Home",
  },
  {
    path: ["/dashboard"],
    exact: true,
    component: "Dashboard",
  },
  {
    path: ["/login"],
    exact: true,
    component: "Auth",
  },
  {
    path: ["/profile"],
    exact: true,
    component: "Profile",
  },
  {
    path: ["/users/*"],
    exact: true,
    component: "detail",
  },
];

export default routes;
