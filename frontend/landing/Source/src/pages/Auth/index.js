import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './AuthForm.module.css';
import Layout from '../../components/LoginNav'
import AuthContext from '../../store/auth-context';
// import { eventNames } from 'process';

const AuthForm = () => {
  // get history state
  const history = useHistory();

  // Get DOM state
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);
  // login State
  const [isLogin, setIsLogin] = useState(true);

  // Submit state
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  // Submit Event function
  const submitHandler = (event) => {
    event.preventDefault();

    // get DOM value from input
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // starting submit
    setIsLoadingSubmit(true)
    let url;
      
    if (isLogin){
      // Sign in
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAjyNQx0JeGtAkOlJDhQADGBo2OIjcfLM0';
    } else {
      //Sign up
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAjyNQx0JeGtAkOlJDhQADGBo2OIjcfLM0';
    }
    
    fetch(
      //URL
      url,
      //payload
      {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
      }),
      //header
      headers: {
        'Content-Type': 'application/json'
      }

    // HTTP response
    }).then((response) => {

      // Finished Submit
      setIsLoadingSubmit(false)
      
      // if 200 OK
      if (response.ok) {
        //success
        return response.json(); 
      } else {
        //fail
        return response.json().then(data => {
          //show error
          let errorMessage = 'Authentication failed!';         
          throw new Error(errorMessage);
        });
      }
    })
    .then((data) => {
      authCtx.login(data.idToken);
      history.replace('/profile')
    })
    .catch((err) => {
      alert(err.message);
    })

  };
  
  

  return (
    <Layout>
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef}/>
        </div>
        <div className={classes.actions}>
          {!isLoadingSubmit && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoadingSubmit && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
    </Layout>
  );
};

export default AuthForm;
