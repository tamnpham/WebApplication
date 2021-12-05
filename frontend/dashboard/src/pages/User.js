/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect, useContext } from "react";
import LinearProgress from '@mui/material/LinearProgress';
import { useFormik, Form, FormikProvider, FieldArray, getIn, Field, Formik } from "formik";

// material
import {
  Stack,
  Container,
  Typography,
  Grid,
  Paper,
  Avatar,
  Button,
  Box,
  TextField,
  FormControl,
} from "@mui/material";
// components
import Page from "../components/Page";
import { AuthContext } from '../store/auth-context';
// -----------------------------Variable and State--------------------------


// -----------------------------CSS-----------------------------------------

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: "white",
  backgroundColor: "#292f45",
}));

const AvatarImage = styled(Avatar)(({ theme }) => ({
  textAlign: "center",
}));

const useStyles = makeStyles({
  buttonEdit: {
    marginTop: "50px",
    justifyContent: "center",
    backgroundColor: "#ABEBC6",
  },
  formEdit: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: "10%",
    paddingRight: "10%",
    // width: '70%',
  },
  badgeBlock: {
    backgroundColor: "#292f45",
  },
  badgeImage: {
    width: "20%",
    height: "20%",
  },
  badgeBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    color: "white"
  }
});

function refreshPage() {
  window.location.reload(false);
}

export default function User() {
  const classes = useStyles();
  const [isEditMode, setEditMode] = useState(false);
  const [userState, setUserState] = useState(null);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    //fetch data from server
    const apiUrl = `http://34.72.189.169:8080/api/user/profile/`;
    const auth = localStorage.getItem("token");

    const request = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth,
      },
    };

    fetch(apiUrl, request)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        const userInfo = response.data.user;
        authCtx.update(userInfo.first_name, userInfo.last_name, userInfo.avatar);
        setUserState(response.data.user);
        
      });

    },[])

    const formik = useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        major: "",
        school: "",
        phone: ""
      },
      onSubmit: (values, actions) => {
        const auth = localStorage.getItem("token");
        // actions.setSubmitting(true);
        console.log(values.firstName);
        console.log(values.lastName);
        console.log(values.major);
        console.log(values.school);
        console.log(values.phone);
        console.log(values.avatar);

        var data = new FormData();
        data.append("first_name", values.firstName);
        data.append("last_name", values.lastName);
        data.append("major", values.major);
        data.append("school", values.school);
        data.append("phone", values.phone);
        if (values.avatar != null) {
          data.append("avatar", values.avatar);
        }

        const request = {
          method: "POST",
          headers: {
            Authorization: "Bearer " + auth,
          },
          body: data
        };

        let url = "http://34.72.189.169:8080/api/user/profile/";

         fetch(url, request)
          // HTTP response
          .then((response) => {
            //  OK
            if (response.ok) {
              //success
              console.log(response);
              return response.json();
            } else {
              //fail
              return response.json().then((data) => {
                //show error
                let errorMessage = "Update failed!";
                throw new Error(errorMessage);
              });
            }
          })
          .then((data) => {
            if (data.status === "Success")
            alert('Update profile successfully! Please reload the page!');
            refreshPage()
          })
          .catch((err) => {
            alert(err.message);
          });

        console.log(data);
        setEditMode(false);
      }})
      
      const {
        handleSubmit,
        getFieldProps,
        setFieldValue
      } = formik;

  if (userState != null) {
  return (
    <Page title="LSExam | Profile">
      {!isEditMode && (
        <Container>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h4" gutterBottom>
              Profile
            </Typography>
          </Stack>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AvatarImage
                  alt="Remy Sharp"
                  src={userState.avatar}
                  sx={{ width: 150, height: 150 }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Item sx={{ height: "100%" }}>
                <Typography variant="h4">
                  {userState.first_name} {userState.last_name}
                </Typography>

                <Typography variant="body1">
                  <strong>Email:</strong> {userState.email}
                </Typography>

                <Typography variant="body1">
                  <strong>Phone:</strong> {userState.phone}
                </Typography>

                <Typography variant="body1">
                  <strong>Major:</strong> {userState.major}
                </Typography>

                <Typography variant="body1">
                  <strong>School:</strong> {userState.school}
                </Typography>
              </Item>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Item sx={{ height: "100%" }}>
                <Typography variant="h4" sx={{ textAlign: "center" }}>
                  Max Score
                </Typography>

                {userState.max_score !== null && (
                  <Typography
                    variant="h1"
                    sx={{ textAlign: "center", color: "#43b581" }}
                  >
                    {userState.max_score.score}
                  </Typography>
                )}
              </Item>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Item sx={{ height: "100%" }}>
                <Typography variant="h4" sx={{ textAlign: "center" }}>
                  Best Subject
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Item>
                      <Box className={classes.badgeBox}>
                        <img
                          src="https://www.clipartmax.com/png/middle/123-1232870_logo-subject-clip-art-subject-logo.png"
                          className={classes.badgeImage}
                        />
                      </Box>
                      <Typography
                        variant="h4"
                        sx={{ textAlign: "center", color: "#43b581", pt: "1%" }}
                      >
                        Math
                      </Typography>
                    </Item>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Item>
                      <Box className={classes.badgeBox}>
                        <img
                          src="https://freesvg.org/img/1529989446.png"
                          className={classes.badgeImage}
                        />
                      </Box>
                      <Typography
                        variant="h4"
                        sx={{ textAlign: "center", color: "#43b581", pt: "1%" }}
                      >
                        English
                      </Typography>
                    </Item>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Item>
                      <Box className={classes.badgeBox}>
                        <img
                          src="https://www.pinclipart.com/picdir/big/11-112061_content-png-pinterest-clip-art-svg-file-gold.png"
                          className={classes.badgeImage}
                        />
                      </Box>
                      <Typography
                        variant="h4"
                        sx={{ textAlign: "center", color: "#43b581", pt: "1%" }}
                      >
                        History
                      </Typography>
                    </Item>
                  </Grid>
                </Grid>
              </Item>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Item sx={{ height: "100%" }}>
                <Typography variant="h4" sx={{ textAlign: "center" }}>
                  Badges
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    pt: "1%",
                  }}
                >
                  <AvatarImage
                    alt="Remy Sharp"
                    src="https://i.pinimg.com/originals/e6/dd/c6/e6ddc6f9aa34a62bb90caf59e91cc7c8.png"
                    sx={{ width: 130, height: 130 }}
                  />
                </Box>
              </Item>
            </Grid>
          </Grid>

          <Box textAlign="center">
            <Button
              onClick={() => setEditMode(true)}
              variant="contained"
              color="success"
              className={classes.buttonEdit}
            >
              Edit profile
            </Button>
          </Box>
        </Container>
      )}

      {isEditMode && (
        <Container>
          <Formik value={formik}>
            <Form autoComplete="off" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3} sx={{ textAlign: "center" }}>
                  <AvatarImage
                    alt="Remy Sharp"
                    src={userState.avatar}
                    sx={{
                      width: 150,
                      height: 150,
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginTop: "100px",
                      marginBottom: "50px",
                    }}
                  />
                  <Button variant="contained" component="label">
                    Upload File
                    <input
                      accept="image/*"
                      type="file"
                      hidden
                      onChange={(e) => {
                        setFieldValue("avatar", e.target.files[0]);
                      }}
                    />
                  </Button>
                </Grid>
                <Grid item xs={12} sm={9} sx={{ textAlign: "center" }}>
                  <Typography variant="h3" sx={{ pb: 5 }}>
                    <strong>Update profile</strong>
                  </Typography>
                  <Box className={classes.formEdit}>
                    <FormControl>
                      {/* <label>Firstname</label> */}
                      <TextField
                        id="outlined-basic"
                        label="Firstname"
                        variant="outlined"
                        sx={{ pb: 2 }}
                        inputProps={{ className: classes.input }}
                        {...getFieldProps("firstName")}
                      />

                      {/* <label>Lastname</label> */}
                      <TextField
                        id="outlined-basic"
                        label="Lastname"
                        variant="outlined"
                        sx={{ pb: 2 }}
                        inputProps={{ className: classes.input }}
                        {...getFieldProps("lastName")}
                      />

                      {/* <label>Address</label> */}
                      <TextField
                        id="outlined-basic"
                        label="Major"
                        variant="outlined"
                        sx={{ pb: 2 }}
                        inputProps={{ className: classes.input }}
                        {...getFieldProps("major")}
                      />

                      {/* <label>Phone</label> */}
                      <TextField
                        id="outlined-basic"
                        label="School"
                        variant="outlined"
                        sx={{ pb: 2 }}
                        inputProps={{ className: classes.input }}
                        {...getFieldProps("school")}
                      />

                      {/* <label>Email</label> */}
                      <TextField
                        id="outlined-basic"
                        label="Phone"
                        variant="outlined"
                        sx={{ pb: 2 }}
                        inputProps={{ className: classes.input }}
                        {...getFieldProps("phone")}
                      />
                    </FormControl>
                  </Box>

                  <Box textAlign="center">
                    <Button
                      // onClick={() => setEditMode(false)}
                      type="submit"
                      variant="contained"
                      color="success"
                      className={classes.buttonEdit}
                    >
                      Save
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Container>
      )}
    </Page>
  );
              } else {
                return (
                  <>
                    <Page
                      sx={{
                        p: "5%",
                        backgroundColor: "#161d31",
                        color: "white",
                        height: "100%",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          left: "60%",
                          top: "60%",
                          width: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <Typography
                          variant="h1"
                          color="white"
                          textAlign="center"
                        >
                          {" "}
                          Loading...{" "}
                        </Typography>
                        <LinearProgress color="success" />
                      </div>
                    </Page>
                  </>
                );
              }
}
