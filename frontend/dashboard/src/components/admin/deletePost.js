import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    Container,
    Box,
    Tab,
    Grid,
    MenuItem,
    Button,
    Select,
    TextField,
    Stack,
    Typography,
    InputLabel,
    FormControl
  } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik, Form, FormikProvider, FieldArray, getIn, Field, Formik } from "formik";
import MDEditor from '@uiw/react-md-editor';

const useStyles = makeStyles({
  input: {
    color: "white"
  },
  typography: {
    position: "absolute",
    left: "50%",
    transform: "(-50%,50%)",
  },
  center: {
    textAlign: "center",
  },
  answer: {
    textAlign: "left",
    borderRadius: 4,
    border: "1px solid",
    p: 2,
    backgroundColor: "#ABEBC6",
    color: "#145A32",
  },
  inputSelect: {
    color: "white",
  },
});

export default function DeletePost() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [postDeleteId, setPostDeleteId] = useState(null);

  
  function refreshPage() {
    window.location.reload(false);
  }
  

  useEffect(() => {
    const apiUrl = `http://34.72.189.169:8080/api/blog/`;
    const auth = localStorage.getItem("token");
    const requestOption = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth,
      },
    };

    fetch(apiUrl, requestOption)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setPosts(response);
      });
  },[postDeleteId]);

  const handleOnClick = (e) => {

    console.log(postDeleteId);
    const apiUrl = 'http://34.72.189.169:8080/api/blog/'+postDeleteId+'/';
    const auth = localStorage.getItem("token");
    const request = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + auth
      },
    };

    fetch(apiUrl, request)
      .then((res) => {
        if (res.ok) {
            alert('Delete post '+ postDeleteId + 'successfully!')
            refreshPage();
        }
      })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setPostDeleteId(value)
  };

  return (
    <>
      <Box sx={{ width: "100%", typography: "body1", pt: "5%" }}>
        <Box sx={{ textAlign: "center" }}>
          <FormControl variant="standard" sx={{ m: 1, width: "50%", pb: "5%" }}>
            <InputLabel variant="outlined"> Select post </InputLabel>
            <Select
              name="postId"
              onChange={handleInputChange}
              inputProps={{ className: classes.inputSelect }}
            >
              {posts &&
                posts.length > 0 &&
                posts.map((post) => (
                  <MenuItem value={post.id} key={post.id}>
                    {post.title}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box textAlign="center">
        <Button
          onClick={handleOnClick}
          type="submit"
          variant="contained"
          color="success"
          className={classes.buttonEdit}
          sx={{ mt: "2%" }}
        >
          Delete
        </Button>
      </Box>
    </>
  );
}