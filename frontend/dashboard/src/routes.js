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
        </>
      )}

      <Route path="/register" element={<Register />} />

      {authCtx.isLoggedIn && (
        <Routes>
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route path="app" element={<DashboardApp />} />
            <Route path="user" element={<User />} />
            <Route path="products" element={<Products />} />
            <Route path="blog" element={<Blog />} />
            <Route path="admin" element={<Admin />} />
          </Route>
          <Route path="quiz"> <Quiz /> </Route>
        </Routes>
      )}

      <Route path="/*" element={<NotFound />} />
    </Routes>
  );

  // return useRoutes([
  //   {
  //     path: '/dashboard',
  //     element: <DashboardLayout />,
  //     children: [
  //       { element: <Navigate to="/dashboard/app" replace /> },
  //       { path: 'app', element: <DashboardApp /> },
  //       { path: 'user', element: <User /> },
  //       { path: 'products', element: <Products /> },
  //       { path: 'blog', element: <Blog /> }
  //     ]
  //   },
  //   {
  //     path: '/',
  //     element: <LogoOnlyLayout />,
  //     children: [
  //       { path: 'login', element: <Login /> },
  //       { path: 'register', element: <Register /> },
  //       { path: '404', element: <NotFound /> },
  //       { path: '/', element: <Navigate to="/login" /> },
  //       { path: '*', element: <Navigate to="/404" /> }
  //     ]
  //   },
  //   { path: '*', element: <Navigate to="/404" replace /> }
  // ]);
}
