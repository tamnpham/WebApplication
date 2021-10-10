import classes from './ProfileForm.module.css';
import {useRef, useContext} from 'react'
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {
  const newPasswordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAjyNQx0JeGtAkOlJDhQADGBo2OIjcfLM0',
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false
        }),
        //header
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
    //Change successful -> redirect
        if (response.ok) {
          alert('Change password successfull!')
        }
      })
    }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
 
}

export default ProfileForm;
