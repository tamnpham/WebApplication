import { Navigate, useRoutes, Routes, Route } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardApp from "./pages/DashboardApp";
import Products from "./pages/Products";
import Blog from "./pages/Blog";
import User from "./pages/User";
import NotFound from "./pages/Page404";
import Admin from "./pages/Admin";
import Quiz from "./pages/Quiz";

import { useContext } from "react";
import { AuthContext } from "./store/auth-context";
// ----------------------------------------------------------------------

export default function Router() {
  const authCtx = useContext(AuthContext);

  return (
    <Routes>
      {!authCtx.isLoggedIn && (
        <>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </>
      )}

      {authCtx.isLoggedIn && (
        <Route>
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route path="app" element={<DashboardApp />} />
            <Route path="user" element={<User />} />
            <Route path="products" element={<Products />} />
            <Route path="blog" element={<Blog />} />
            <Route path="admin" element={<Admin />} />
          </Route>
          <Route path="quiz" element={<Quiz />} />
        </Route>
      )}

      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
