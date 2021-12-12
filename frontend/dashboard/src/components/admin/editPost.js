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
    FormControl,
    Autocomplete
  } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
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

export default function EditPost() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [content, setContent] = React.useState("**Hello world!!!**");
  const [postGetEdit, setPostGetEdit] = useState([]);

  const [value, setValue] = React.useState(posts[0]);
  const [inputValue, setInputValue] = React.useState("");

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
            return { label: blog.title, id: blog.id };
          });
          setPosts(blogs);
          console.log(blogs);
        });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (postId) => {
    const apiUrl = `${API_SERVER}/api/blog/` + postId;
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
        setPostGetEdit(response);
        setContent(response.content);
      });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: postGetEdit.title,
      image: "",
    },
    onSubmit: (values, actions) => {
      console.log(postGetEdit.id);
      console.log(values.title);
      console.log(content);

      const auth = localStorage.getItem("token");
      let data = new FormData();
      data.append("id", postGetEdit.id);
      data.append("title", values.title);
      data.append("content", content);
      data.append("image", values.image);

      const requestOption = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + auth,
        },
        body: data,
      };

      let url = `${API_SERVER}/api/blog/update/`;

      fetch(url, requestOption)
        // HTTP response
        .then((response) => {
          //  OK
          if (response.ok) {
            //success
            alert("Edit post successfully!");
            console.log(response);
            return response.json();
          } else {
            //fail
            return response.json().then((data) => {
              //show error
              let errorMessage = "Update blog failed!";
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          alert(err.message);
        });
    },
  });

  const { handleSubmit, getFieldProps, setFieldValue } = formik;

  return (
    <>
      <Box sx={{ width: "100%", typography: "body1", pt: "5%" }}>
        <Box sx={{ textAlign: "center", mb: "5%" }}>
          <center>
            {/* <div>{`value: ${value !== null ? `'${value}'` : "null"}`}</div>
            <div>{`inputValue: '${inputValue}'`}</div> */}
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
      </Box>

      <Formik value={formik}>
        <Form autoComplete="on" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} sx={{ textAlign: "center" }}>
              <Box className={classes.formEdit}>
                <TextField
                  id="outlined-basic"
                  // label="Update title"
                  defaultValue={postGetEdit.title}
                  variant="outlined"
                  sx={{ pb: 2, width: "50%" }}
                  inputProps={{ className: classes.input }}
                  {...getFieldProps("title")}
                />
              </Box>

              <Button
                variant="contained"
                component="label"
                sx={{ mt: "4%", mb: "4%" }}
              >
                Upload Cover Image
                <input
                  accept="image/*"
                  type="file"
                  hidden
                  onChange={(e) => {
                    setFieldValue("image", e.target.files[0]);
                  }}
                />
              </Button>

              <div className="container">
                <MDEditor
                  value={content}
                  onChange={setContent}
                  style={{ height: "30%" }}
                  sx={{ mt: "5%" }}
                />
              </div>

              <Box textAlign="center">
                <Button
                  // onClick={() => setEditMode(false)}
                  type="submit"
                  variant="contained"
                  color="success"
                  className={classes.buttonEdit}
                  sx={{ mt: "5%" }}
                >
                  Save
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </>
  );
}