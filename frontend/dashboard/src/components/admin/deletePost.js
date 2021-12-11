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
import Autocomplete from '@mui/material/Autocomplete';
import { useFormik, Form, FormikProvider, FieldArray, getIn, Field, Formik } from "formik";
import MDEditor from '@uiw/react-md-editor';
import dotenv from "dotenv";
dotenv.config();
const API_SERVER=process.env.REACT_APP_LSEXAM_API_SERVER; 

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
  
  const [value, setValue] = React.useState(posts[0]);
  const [inputValue, setInputValue] = React.useState('');

  useEffect(() => {
    const interval = setInterval(() => {
    const apiUrl = `${API_SERVER}/api/blog/`;
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
        const blogs = response.map((blog) => {
          return {label: blog.title, id: blog.id};
        });
        setPosts(blogs);
        console.log(blogs);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   const apiUrl = `${API_SERVER}/api/blog/`;
  //   const auth = localStorage.getItem("token");
  //   const requestOption = {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + auth,
  //     },
  //   };

  //   fetch(apiUrl, requestOption)
  //     .then((res) => res.json())
  //     .then((response) => {
  //       console.log(response);
  //       setPosts(response);
  //     });
  // },[postDeleteId]);



  const handleOnClick = (e) => {
    console.log(postDeleteId);
    const apiUrl = `${API_SERVER}/api/blog/`+postDeleteId+`/`;
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
            // refreshPage();
        }
      })
  }

  const handleInputChange = (postId) => {
    setPostDeleteId(postId)
  };

  return (
    <>
      <Box sx={{ width: "100%", typography: "body1", pt: "5%" }}>
        <Box sx={{ textAlign: "center", mb: "5%" }}>
          <center>
            <div>{`value: ${value !== null ? `'${value}'` : "null"}`}</div>
            <div>{`inputValue: '${inputValue}'`}</div>
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                if (newValue !== null) {
                  setValue(newValue.id);
                  handleInputChange(newValue.id);
                }
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="controllable-states-demo"
              options={posts}
              sx={{ width: "50%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Post"
                  inputProps={{
                    ...params.inputProps,
                    className: classes.input,
                  }}
                />
              )}
            />
          </center>
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
      </Box>
    </>
  );
}