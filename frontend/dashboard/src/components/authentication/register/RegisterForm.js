import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

// ----------------------------------------------------------------------

const useStyles = makeStyles({
  input: {
    color: "white"
  }
});

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: (values, actions) => {
      actions.setSubmitting(true);
      console.log(values.firstName);
      console.log(values.lastName);
      console.log(values.email);
      console.log(values.password);
      console.log(values.role);
      
      // let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAjyNQx0JeGtAkOlJDhQADGBo2OIjcfLM0';
      let url = 'http://34.72.189.169:8080/api/user/create';

      fetch(
        //URL
        url,
        //payload
        {
          method: 'POST',
          body: JSON.stringify({
            email: values.email,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
            role: values.role,
        }),
        //header
        headers: {
          'Content-Type': 'application/json'
        }
  
      // HTTP response
      }).then((response) => {
        // if 200 OK
        if (response.ok) {
          //success
          console.log(response);
          return response.json(); 
        } else {
          //fail
          return response.json().then(data => {
            //show error
            let errorMessage = 'Register failed!';         
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data.status)
        // eslint-disable-next-line eqeqeq
        if (data.status == "Success") {
          
          alert("Register successfully! Please login and take an exam :)")
          navigate('/', { replace: true });
        } else {
          let errorMessage = 'Something went wrong! Try again!';         
          throw new Error(errorMessage);
        }
        // console.log(authCtx.isLoggedIn);
        
      })
      .catch((err) => {
        alert(err.message);
      })

      actions.setSubmitting(false);
    }
  });
  
  const classes = useStyles();
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField 
              fullWidth
              label="First name"
              {...getFieldProps("firstName")}
              // error={Boolean(touched.firstName && errors.firstName)}
              // helperText={touched.firstName && errors.firstName}
              inputProps={{ className: classes.input}}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps("lastName")}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
              inputProps={{ className: classes.input}}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            inputProps={{ className: classes.input}}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
            inputProps={{ className: classes.input}}
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Role"
              placeholder="Student"
              {...getFieldProps("role")}
              inputProps={{ className: classes.input}}
            >
              <MenuItem value={'Student'}>Student</MenuItem>
              <MenuItem value={'Teacher'}>Teacher</MenuItem>
            </Select>
          </FormControl>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
