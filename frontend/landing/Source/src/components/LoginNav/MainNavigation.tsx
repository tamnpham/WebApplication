import { Link } from 'react-router-dom';
import { useContext } from 'react';
import classes from './MainNavigation.module.css';
import AuthContext from '../../store/auth-context';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;  

  const logoutHandler = () => {
    authCtx.logout();
  }

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>LSExam</div>
      </Link>
      <nav>
        <ul>
          {/* show login button */}
          {!isLoggedIn && (
            <li>
              <Link to='/login'>Login</Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}

        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
