import { Suspense, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// import routes from "./config";
import { Styles } from "../styles/styles";
import AuthContext from "../store/auth-context";
import Home from "../pages/Home"
import AuthForm from "../pages/Auth"
import UserProfile from "../pages/Profile"

const Router = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Suspense fallback={null}>
      <Styles />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>

        {/* {!authCtx.isLoggedIn && ( */}
          <Route path="/login" exact>
            <AuthForm />
          </Route>
        {/* // )} */}

        <Route path="/profile" exact>
          {authCtx.isLoggedIn && <UserProfile />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>
        
        <Route path="*" exact>
          <Redirect to="/"/>
        </Route>

        {/* {routes.map((routeItem) => {
          return (
            <Route
              key={routeItem.component}
              path={routeItem.path}
              exact={routeItem.exact}
              component={lazy(() => import(`../pages/${routeItem.component}`))}   
            />
          );
        })} */}
      </Switch>
    </Suspense>
  );
};

// import Home from "../pages/Home"
// import Login from "../pages/Login"
// const Router = () => {
//   return (
//       <>
//       <Styles />
//       <Route path="/home">
//         <Home />
//       </Route>
//       <Route path="/login">
//         <Login />
//       </Route>
//       </>
//   );
// };

export default Router;
