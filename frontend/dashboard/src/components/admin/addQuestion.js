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
import { useNavigate } from "react-router-dom";

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

export default function AddQuestion(questionData) {
    const classes = useStyles();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    function refreshPage() {
      window.location.reload(false);
    }
    
    useEffect(() => {
      try {
        const apiUrl = `${API_SERVER}/api/category`;
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
              console.log(response.length);
              setCategories(response);
            })
            .catch((err) => {
              alert(err.message);
              navigate("/error");
            });
        }
        catch (err) {
          console.log(err);
        }
        
    }, []);

    // console.log(questionData)
    // console.log(categories)

    return (
      <Container>
        <Formik
          initialValues={{
            category: "",
            // title: "",
            content: "",
            answers: [],
            trueAnswer: 0,
            image: "",
          }}
          onSubmit={(values) => {
            const auth = localStorage.getItem("token");
            let data = new FormData();
            data.append("category", values.category);
            // data.append("title", values.title);
            data.append("content", values.content);
            data.append("trueAnswer", values.trueAnswer);
            data.append("image", values.image);
            const arrayAnswers = values.answers;
            for (var i = 0; i < arrayAnswers.length; i++) {
              data.append("answers", arrayAnswers[i]);
            }
            const requestOption = {
              method: "POST",
              headers: {
                Authorization: "Bearer " + auth,
              },
              body: data,
            };

            let url = `${API_SERVER}/api/question/`;

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
                    let errorMessage = "Create Question failed!";
                    throw new Error(errorMessage);
                  });
                }
              })
              .then((data) => {
                console.log(data);
                alert("Create successfully");
                refreshPage();
              })
              .catch((err) => {
                alert(err.message);
              });
          }}
          render={({ values, getFieldProps, setFieldValue }) => (
            <Form>
              <Stack spacing={2}>
                <FormControl
                  variant="standard"
                  sx={{ m: 1, width: "100%", pb: "5%" }}
                >
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="categoryId"
                    value={questionData.categoryId}
                    // placeholder="Category"
                    // onChange={handleInputChange}
                    // label="Category"
                    {...getFieldProps("category")}
                    inputProps={{ className: classes.inputSelect }}
                  >
                    {categories &&
                      categories.length &&
                      categories.map((category) => (
                        <MenuItem value={category.id} key={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Question"
                  variant="outlined"
                  {...getFieldProps("content")}
                  multiline
                  inputProps={{ className: classes.inputSelect }}
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{ mt: "4%", mb: "4%" }}
                  >
                    Upload Image
                    <input
                      accept="image/*"
                      className={classes.input}
                      onChange={(e) => {
                        setFieldValue("image", e.target.files[0]);
                      }}
                      hidden
                      id="raised-button-file"
                      type="file"
                    />
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="True Answer (0->A,1->B,2->C,3->D,...)"
                      variant="outlined"
                      sx={{ width: "100%" }}
                      {...getFieldProps("trueAnswer")}
                      inputProps={{ className: classes.inputSelect }}
                    />
                  </Grid>
                </Grid>
                <FieldArray
                  name="answers"
                  render={(arrayHelpers) => (
                    <div>
                      {values.answers && values.answers.length > 0 ? (
                        values.answers.map((answer, index) => (
                          <Grid container key={index}>
                            <Grid item xs="8" sm="8" sx={{mb:2}}>
                              <Field
                                variant="outlined"
                                name={`answers.${index}`}
                                inputProps={{
                                  className: classes.inputSelect,
                                }}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  boxSizing: "border-box",
                                  borderRadius: "7px",
                                  backgroundColor: "#161d31",
                                  color: "white",
                                  fontSize: "17px",
                                }}
                                component="textarea"
                              ></Field>
                            </Grid>
                            <Grid item xs="2" sm="2">
                              <center>
                                <Button
                                  type="button"
                                  variant="contained"
                                  sx={{ m: 1 }}
                                  onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                >
                                  -
                                </Button>
                              </center>
                            </Grid>
                            <Grid item xs="2" sm="2">
                              <center>
                                <Button
                                  type="button"
                                  variant="contained"
                                  sx={{ m: 1 }}
                                  onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                                >
                                  +
                                </Button>
                              </center>
                            </Grid>
                          </Grid>
                        ))
                      ) : (
                        <Button
                          type="button"
                          variant="contained"
                          sx={{ m: 2 }}
                          onClick={() => arrayHelpers.push("")}
                        >
                          Add an Answer
                        </Button>
                      )}
                    </div>
                  )}
                />
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