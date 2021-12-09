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
    FormControl,
    InputLabel
  } from "@mui/material";
  import { TabPanel, TabList, TabContext } from "@mui/lab";
  import { makeStyles } from "@material-ui/core";
  
  //formik
  import { Form, FieldArray, Field, Formik } from "formik";
  // components
  import Page from "../Page";
  //React
  import { useState, useEffect } from "react";
  import dotenv from "dotenv";
dotenv.config();
const API_SERVER=process.env.REACT_APP_LSEXAM_API_SERVER; 
  
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
  });
  
  export default function AddCategory() {
      const classes = useStyles();
  
      return (
        <Container>
          <Formik
            initialValues={{
              name: "",
            }}
            onSubmit={(values) => {
              const auth = localStorage.getItem("token");
              let data = new FormData();
              data.append("name", values.name);

              const requestOption = {
                method: "POST",
                headers: {
                  Authorization: "Bearer " + auth,
                },
                body: data,
              };

              let url = `${API_SERVER}/api/category/`;

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
                      let errorMessage = "Create Category failed!";
                      throw new Error(errorMessage);
                    });
                  }
                })
                .then((data) => {
                  console.log(data);
                  alert("Create successfully");
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
                    {/* <InputLabel>Category Name</InputLabel> */}
                    <TextField
                      label="Category Name"
                      variant="outlined"
                      {...getFieldProps("name")}
                      inputProps={{ className: classes.inputSelect }}
                    />
                  </FormControl>
                  <Button variant="contained" sx={{ m: 1 }} type="submit">
                      Submit
                    </Button>
                </Stack>
              </Form>
            )}
          />
        </Container>
      );
  }