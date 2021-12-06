// material
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
    FormControl
  } from "@mui/material";
  import { TabPanel, TabList, TabContext } from "@mui/lab";
  import { makeStyles } from "@material-ui/core";
  
  // components
  import Page from "../Page";
  //React
  import { useState, useEffect } from "react";
  import React from "react";
import MDEditor from '@uiw/react-md-editor';
import { useFormik, Form, FormikProvider, FieldArray, getIn, Field, Formik } from "formik";

  // --------------------------------------------
  
  
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
    input: {
        color: "white"
    }
  });
  
  export default function AddPost(questionData) {
      const classes = useStyles();
  
      const [categories, setCategories] = useState([]);
      const [content, setContent] = React.useState("**Hello world!!!**");

      
    function refreshPage() {
      window.location.reload(false);
    }
    

      const formik = useFormik({
        initialValues: {
          title: "",
          image: ""
        },
        onSubmit: (values, actions) => {
          const auth = localStorage.getItem("token");
          // actions.setSubmitting(true);
          console.log(values.title);
          // console.log(content)

          var data = new FormData();
          data.append("title", values.title);
          data.append("content", content);
          data.append("image", values.image);

          const request = {
            method: "POST",
            headers: {
              Authorization: "Bearer " + auth,
            },
            body: data
          };
  
          let url = "https://34.72.189.169:8080/api/blog/";
  
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
                  let errorMessage = "Create failed!";
                  throw new Error(errorMessage);
                });
              }
            })
            .then((data) => {
              if (data !== null)
              alert('Create blog successfully!');
              refreshPage();
            })
            .catch((err) => {
              alert(err.message);
            });
        }})

      const {
        handleSubmit,
        getFieldProps,
        setFieldValue
      } = formik;
  
      return (
        <>
          <Formik value={formik}>
            <Form autoComplete="off" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} sx={{ textAlign: "center" }}>
                  <Box className={classes.formEdit}>
                    <FormControl>
                      <TextField
                        id="outlined-basic"
                        label="Title"
                        variant="standard"
                        sx={{ pb: 2 }}
                        inputProps={{ className: classes.input }}
                        {...getFieldProps("title")}
                      />
                    </FormControl>
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

                  <div className="container" sx={{ mt: 3 }}>
                    <MDEditor value={content} onChange={setContent} />
                  </div>

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
        </>
      );
  }