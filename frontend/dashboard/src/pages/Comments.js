// material
import { Box, Typography, Button, Paper, TextField, FormControl, Stack, Grid, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import ReactMarkdown from "react-markdown";
import LinearProgress from "@mui/material/LinearProgress";
// components
import Page from "../components/Page";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
// import Typography from '@mui/material/Typography';
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from "@material-ui/core";
//formik
import { Form, FieldArray, Field, Formik } from "formik";
import dotenv from "dotenv";
dotenv.config();
const API_SERVER=process.env.REACT_APP_LSEXAM_API_SERVER; 

const useStyles = makeStyles({
    typography: {
      position: "absolute",
      left: "50%",
      transform: "(-50%,50%)",
    },
    center: {
      textAlign: "center",
    },
    inputSelect: {
      color: "white",
    },
});

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: '#161d31'
  }));


export default function Comments(props) {
  const classes = useStyles();
  const postId = props.postId;
  const [commentState, setCommentState] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
    console.log("This will run every second!");

    const apiUrl = `${API_SERVER}/api/comment/`;
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
        setCommentState(response);
      });

    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (commentState !== null) {
    return (
      <div style={{ backgroundColor: "#161d31" }}>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <hr></hr>
            {commentState.map((comment) => (
              <Stack direction="row">
                <Item>
                  <Avatar alt="Remy Sharp" src={comment.user.avatar_url} />
                </Item>
                <Item>
                  <Box>
                    <Typography variant="body" color="#00ab55">
                      <strong>
                        {comment.user.first_name} {comment.user.last_name}
                      </strong>
                    </Typography>
                    : {comment.content}
                  </Box>
                </Item>
              </Stack>
            ))}
          </Grid>
          <Grid item xs={12} sm={12}>
            <Box sx={{ width: "100%", mt: 3 }}>
              <Formik
                initialValues={{
                  content: "",
                }}
                onSubmit={(values) => {
                  const auth = localStorage.getItem("token");

                  let data = new FormData();
                  data.append("blog", postId);
                  data.append("content", values.content);

                  const requestOption = {
                    method: "POST",
                    headers: {
                      Authorization: "Bearer " + auth,
                    },
                    body: data,
                  };

                  let url = `${API_SERVER}/api/comment/`;

                  fetch(url, requestOption)
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
                          let errorMessage = "Create comment failed!";
                          throw new Error(errorMessage);
                        });
                      }
                    })
                    .then((data) => {
                      console.log(data);
                      //   alert("Comment successfully");
                    })
                    .catch((err) => {
                      alert(err.message);
                    });
                }}
                render={({ values, getFieldProps, setFieldValue }) => (
                  <Form>
                    <Stack spacing={2}>
                      <FormControl
                        variant="outlined"
                        sx={{ m: 1, width: "100%", pb: "5%" }}
                      >
                        <Typography variant="h3"> Comments </Typography>
                        {/* <InputLabel>Category Name</InputLabel> */}
                        <TextField
                          multiline
                          placeholder="comment here..."
                          variant="outlined"
                          {...getFieldProps("content")}
                          inputProps={{ className: classes.inputSelect }}
                        />

                        <Button
                          variant="contained"
                          sx={{ mt: 1, width: "10%" }}
                          type="submit"
                        >
                          Comment
                        </Button>
                      </FormControl>
                    </Stack>
                  </Form>
                )}
              />
            </Box>
          </Grid>
        </Grid>
      </div>
    );
  } else {
      return (
          <Typography>Loadding</Typography>
      )
  }
}
