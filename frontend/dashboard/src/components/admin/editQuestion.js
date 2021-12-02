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



export default function EditQuestion() {
  const classes = useStyles();

  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState({});
  const [questionId, setQuestionId] = useState(null);

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setQuestionId(e.target.value);
  };

  useEffect(() => {
    const apiUrl = `http://34.72.189.169:8080/api/question/${questionId}`;
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
        console.log(question.length);
        setQuestion(response);
      });
  }, [questionId])

  useEffect(() => {
    const apiUrl = `http://34.72.189.169:8080/api/question`;
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
        setQuestions(response);
      });
  }, []);


  if (questions.length > 0) {
  return (
    <Container>
      <Stack>
        <FormControl variant="standard" sx={{ m: 1, width: "100%", pb: "5%" }}>
          <Select
            name="questions"
            // value={questionData.categoryId}
            // value={""}
            onChange={handleInputChange}
            inputProps={{ className: classes.inputSelect }}
            // className={classes.inputSelect}
          >
            {questions &&
              questions.length &&
              questions.map((question) => (
                <MenuItem value={question.id} key={question.id}>
                  {question.content}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Stack>
      <Formik
        initialValues={{
          id: 0,
        }}
        onSubmit={(values) => {
          // const auth = localStorage.getItem("token");
          // let data = new FormData();
          // data.append("category", values.category);
          // data.append("title", values.title);
          // data.append("content", values.content);
          // data.append("trueAnswer", values.trueAnswer);
          // data.append("image", values.image);
          // const arrayAnswers = values.answers;
          // for (var i = 0; i < arrayAnswers.length; i++) {
          //   data.append("answers", arrayAnswers[i]);
          // }
          // const requestOption = {
          //   method: "POST",
          //   headers: {
          //     Authorization: "Bearer " + auth,
          //   },
          //   body: data,
          // };

          // let url = "http://34.72.189.169:8080/api/question/";

          // fetch(url, requestOption)
          //   // HTTP response
          //   .then((response) => {
          //     //  OK
          //     if (response.ok) {
          //       //success
          //       console.log(response);
          //       return response.json();
          //     } else {
          //       //fail
          //       return response.json().then((data) => {
          //         //show error
          //         let errorMessage = "Create Question failed!";
          //         throw new Error(errorMessage);
          //       });
          //     }
          //   })
          //   .then((data) => {
          //     console.log(data);
          //   })
          //   .catch((err) => {
          //     alert(err.message);
          //   });
          console.log(values);
        }}
        render={({ values, getFieldProps, setFieldValue }) => (
          <Form>
            {/* <TextField
                label="Title"
                // value={question.title}
                defaultValue={question.title}
                variant="outlined"
                {...getFieldProps("title")}
                inputProps={{ className: classes.inputSelect }}
              /> */}
            <Stack spacing={2}>
              {/* <Select
                name="questionId"
                value={null}
                onChange={handleInputChange}
                label="Question"
                inputProps={{ className: classes.inputSelect }}
              >
                {questions &&
                  questions.length &&
                  questions.map((question) => (
                    <MenuItem value={question.id} key={question.id}>
                      {question.content}
                    </MenuItem>
                  ))}
              </Select> */}
              {question && questions.length !== undefined && (
                <Stack>
                  <TextField
                    // label="Title"
                    variant="outlined"
                    defaultValue={question.title}
                    {...getFieldProps("title")}
                    inputProps={{ className: classes.inputSelect }}
                  />
                  <TextField
                    // label="Question"
                    variant="outlined"
                    defaultValue={question.content}
                    {...getFieldProps("content")}
                    multiline
                    inputProps={{ className: classes.inputSelect }}
                  />
                </Stack>
              )}
              {/* <TextField
                label="Title"
                variant="outlined"
                defaultValue={question.title}
                {...getFieldProps("title")}
                inputProps={{ className: classes.inputSelect }}
              />
              <TextField
                label="Question"
                variant="outlined"
                defaultValue={question.content}
                {...getFieldProps("content")}
                multiline
                inputProps={{ className: classes.inputSelect }}
              /> */}
              {/*   <TextField
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
                        /> */}
            </Stack>
            <Button type="submit">Submit</Button>
          </Form>
        )}
      />
    </Container>
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
              left: "50%",
              top: "50%",
              width: "80%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Typography variant="h1" color="white" textAlign="center">
              Loading...
            </Typography>
          </div>
        </Page>
      </>
    );
  }
}
