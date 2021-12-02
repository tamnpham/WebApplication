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
} from "@mui/material";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import { makeStyles } from "@material-ui/core";

//formik
import { Form, FieldArray, Field, Formik } from "formik";
// components
import Page from "../Page";
//React
import { useState, useEffect } from "react";


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

    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        const apiUrl = `http://34.72.189.169:8080/api/category`;
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
        });
    }, []);

    console.log(questionData)
    console.log(categories)

    return (
        <Container>
            <Formik
                initialValues={{
                  category: "",
                  title: "",
                  content: "",
                  answers: [],
                  trueAnswer: 0,
                  image: "",
                }}
                onSubmit={(values) => {
                  const auth = localStorage.getItem("token");
                  let data = new FormData();
                  data.append("category", values.category);
                  data.append("title", values.title);
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
                    body: data
                  };

                  let url = "http://34.72.189.169:8080/api/question/";

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
                    })
                    .catch((err) => {
                      alert(err.message);
                    });
                }}
                render={({ values, getFieldProps, setFieldValue }) => (
                  <Form>
                    <Stack spacing={2}>
                      <Select
                        name="categoryId"
                        value={questionData.categoryId}
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
                      <TextField
                        label="Title"
                        variant="outlined"
                        {...getFieldProps("title")}
                        inputProps={{ className: classes.inputSelect }}
                      />
                      <TextField
                        label="Question"
                        variant="outlined"
                        {...getFieldProps("content")}
                        multiline
                        inputProps={{ className: classes.inputSelect }}
                      />
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <input
                            accept="image/*"
                            className={classes.input}
                            onChange={(e) => {
                              setFieldValue("image", e.target.files[0]);
                            }}
                            id="raised-button-file"
                            multiple
                            type="file"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            label="True Answer (0->A,1->B,2->C,3->D,...)"
                            variant="outlined"
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
                                <div key={index}>
                                  <Field
                                    variant="outlined"
                                    name={`answers.${index}`}
                                    inputProps={{
                                      className: classes.inputSelect,
                                    }}
                                  />
                                  <Button
                                    type="button"
                                    variant="contained"
                                    sx={{ m: 1 }}
                                    onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                  >
                                    -
                                  </Button>
                                  <Button
                                    type="button"
                                    variant="contained"
                                    sx={{ m: 1 }}
                                    onClick={() =>
                                      arrayHelpers.insert(index, "")
                                    } // insert an empty string at a position
                                  >
                                    +
                                  </Button>
                                </div>
                              ))
                            ) : (
                              <Button
                                type="button"
                                variant="contained"
                                sx={{ m: 1 }}
                                onClick={() => arrayHelpers.push("")}
                              >
                                {/* show this when user has removed all friends from the list */}
                                Add a friend
                              </Button>
                            )}
                            <div>
                              <Button
                                variant="contained"
                                sx={{ m: 1 }}
                                type="submit"
                              >
                                Submit
                              </Button>
                            </div>
                          </div>
                        )}
                      />
                    </Stack>
                  </Form>
                )}
              />
        </Container>
    )
}