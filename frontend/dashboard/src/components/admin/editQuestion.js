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
  FormControl,
  Paper
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

  const [showQuestion, setShowQuestion] = useState(false);

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setQuestionId(e.target.value);
    // setShowQuestion(false);
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
    try{
      fetch(apiUrl, requestOption)
        .then((res) => res.json())
        .then((response) => {
          // console.log(response);
          setQuestion(response);
        });
    }
    catch (err) {
      console.log(err);
    }
    
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

      {question.id && (
        <Formik
          enableReinitialize
          initialValues={{
            id: question.id,
            category: question.category,
            // title: question.title,
            content: question.content,
            answers: question.answers,
            trueAnswer: question.trueAnswer,
            image: question.image,
          }}
          onSubmit={(values) => {
            const auth = localStorage.getItem("token");
            let data = new FormData();
            data.append("category", values.category);
            // data.append("title", values.title);
            data.append("content", values.content);
            data.append("trueAnswer", values.trueAnswer);
            data.append("image", values.image);
            data.append("id", question.id);
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

            let url = "http://34.72.189.169:8080/api/question/update/";

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
                    let errorMessage = "Update Question failed!";
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
            // console.log(values);
          }}
          render={({ values, getFieldProps, setFieldValue }) => (
            <Form>
              <Stack spacing={2}>
                {/* <TextField
                  // label="Title"
                  variant="outlined"
                  // value={question.title}
                  defaultValue={question.title}
                  {...getFieldProps("title")}
                  inputProps={{ className: classes.inputSelect }}
                /> */}
                <TextField
                  // label="Question"
                  variant="outlined"
                  // value={question.content}
                  defaultValue={question.content}
                  {...getFieldProps("content")}
                  multiline
                  inputProps={{ className: classes.inputSelect }}
                />
                <center>
                  <Paper variant="outlined" sx={{ m: 2, width: "300px" }}>
                    <img src={question.image} />
                  </Paper>
                </center>
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
                              onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
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
                    </div>
                  )}
                />
                <Button type="submit" variant="contained" sx={{ m: 1 }}>
                  Submit
                </Button>
              </Stack>
            </Form>
          )}
        />
      )}
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
