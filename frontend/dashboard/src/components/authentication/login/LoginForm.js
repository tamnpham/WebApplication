import * as Yup from 'yup';
import { useState, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { AuthContext } from '../../../store/auth-context';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { makeStyles } from "@material-ui/core/styles";
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import dotenv from "dotenv";
dotenv.config();
const API_SERVER=process.env.REACT_APP_LSEXAM_API_SERVER; 
// ----------------------------------------------------------------------

const useStyles = makeStyles({
  input: {
    color: "white"
  }
});

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const authCtx = useContext(AuthContext);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: (values, actions) => {
      try {
        console.log(values.email);
        console.log(values.password);

        let url = `${API_SERVER}/api/user/login/`;

        fetch(
          //URL
          url,
          //payload
          {
            method: "POST",
            body: JSON.stringify({
              email: values.email,
              password: values.password,
              returnSecureToken: true,
            }),
            //header
            headers: {
              "Content-Type": "application/json",
            },

            // HTTP response
          }
        )
          .then((response) => {
            // if 200 OK
            if (response.ok) {
              //success
              console.log(response);
              return response.json();
            } else {
              //fail
              return response.json().then((data) => {
                //show error
                let errorMessage = "Authentication failed!";
                throw new Error(errorMessage);
              });
            }
          })
          .then((data) => {
            console.log("here");
            console.log(data.data.user);
            authCtx.login(
              data.data.token.access,
              data.data.user.first_name,
              data.data.user.last_name,
              data.data.user.avatar_url,
              data.data.user.role
            );
            // console.log(authCtx.isLoggedIn);
            navigate("/dashboard/app", { replace: true });
          })
          .catch((err) => {
            alert(err.message);
          });
        actions.setSubmitting(false);
      } catch (err) {
        alert(err);
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const classes = useStyles();
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            inputProps={{className: classes.input}}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              className: classes.input,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
