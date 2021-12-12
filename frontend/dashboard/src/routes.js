import { Navigate, useRoutes, Routes, Route  } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardApp from "./pages/DashboardApp";
import Scoreboard from "./pages/Scoreboard";
import History from "./pages/History";
import Blog from "./pages/Blog";
import User from "./pages/User";
import NotFound from "./pages/Page404";
import NotAuthorized from "./pages/PageNotLogin";
import Admin from "./pages/Admin";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Post from "./pages/Post";
import UsersManage from "./pages/UsersManage";
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
          <Route path="/*" element={<NotAuthorized />} />
        </>
      )}

      {authCtx.isLoggedIn && (
        <Route>
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route path="app" element={<DashboardApp />} />
            <Route path="user" element={<User />} />
            <Route path="products" element={<Scoreboard />} />
            <Route path="blog" element={<Blog />} />
            <Route path="admin" element={<Admin />} />
            <Route path="history" element={<History />} />
            <Route path="usersManage" element={<UsersManage />} />
          </Route>
          <Route path="/" element={<Navigate to="/dashboard/app" />} />
          <Route path="post/:id" element={<Post />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="result" element={<Result />} />
        </Route>
      )}

      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
