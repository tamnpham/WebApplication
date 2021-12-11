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
import dotenv from "dotenv";
dotenv.config();
const API_SERVER=process.env.REACT_APP_LSEXAM_API_SERVER; 
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
    width: "100%",
    height: "100%",
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
    const apiUrl = `${API_SERVER}/api/user/profile/`;
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
        const userInfo = response.data.user;
        console.log(userInfo.avatar_url);
        authCtx.update(userInfo.first_name, userInfo.last_name, userInfo.avatar_url);
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
        const auth = authCtx.token;

        var data = new FormData();
        var count = 0;
        if (values.firstName !== "") {
          data.append("first_name", values.firstName);
          count++;
        }

        if (values.lastName !== "") {
          data.append("last_name", values.lastName);
          count++;
        }
        if (values.major !== "") {
          data.append("major", values.major);
          count++;
        }
        if (values.school !== "") {
          data.append("school", values.school);
          count++;
        }
        if (values.phone !== "") {
          data.append("phone", values.phone);
          count++;
        }

        if (values.avatar !== undefined) {
          data.append("avatar", values.avatar);
          count++;
        }

        const request = {
          method: "POST",
          headers: {
            Authorization: "Bearer " + auth,
          },
          body: data
        };

        let url = `${API_SERVER}/api/user/profile/`;

        if (count !== 0) {
          console.log(count)
          console.log(data.get('first_name'))
          console.log(data.get('last_name'))
          console.log(data.get('major'))
          console.log(data.get('school'))
          console.log(data.get('phone'))
          console.log(data.get('avatar'))
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
                alert("Update profile successfully! Please reload the page!");
              refreshPage();
            })
            .catch((err) => {
              alert(err.message);
            });
        }

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
                  src={authCtx.avatar}
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
                      {userState.top_3_scores[1] && (
                        <>
                          <Box className={classes.badgeBox}>
                            <img
                              src="\static\mock-images\badge\top2.png"
                              className={classes.badgeImage}
                            />
                          </Box>

                          <Typography
                            variant="h4"
                            sx={{
                              textAlign: "center",
                              color: "#fbb03b",
                              pt: "1%",
                            }}
                          >
                            {userState.top_3_scores[1].name}
                          </Typography>
                        </>
                      )}
                    </Item>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Item>
                      {userState.top_3_scores[0] && (
                        <>
                          <Box className={classes.badgeBox}>
                            <img
                              src="\static\mock-images\badge\top1.png"
                              className={classes.badgeImage}
                            />
                          </Box>

                          <Typography
                            variant="h4"
                            sx={{
                              textAlign: "center",
                              color: "#fbb03b",
                              pt: "1%",
                            }}
                          >
                            {userState.top_3_scores[0].name}
                          </Typography>
                        </>
                      )}
                    </Item>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Item>
                      {userState.top_3_scores[2] && (
                        <>
                          <Box className={classes.badgeBox}>
                            <img
                              src="\static\mock-images\badge\top3.png"
                              className={classes.badgeImage}
                            />
                          </Box>

                          <Typography
                            variant="h4"
                            sx={{
                              textAlign: "center",
                              color: "#fbb03b",
                              pt: "1%",
                            }}
                          >
                            {userState.top_3_scores[2].name}
                          </Typography>
                        </>
                      )}
                    </Item>
                  </Grid>
                </Grid>
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
                    <Page title="Dashboard | LSExam">
                      <Container maxWidth="xl">
                        <Box sx={{ p: "25%" }}>
                          <center
                            style={{
                              width: "80%",
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
                          </center>
                        </Box>
                      </Container>
                    </Page>
                  </>
                );
              }
}
