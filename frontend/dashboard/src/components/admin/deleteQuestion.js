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
  Paper,
  InputLabel,
  LinearProgress
} from "@mui/material";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import { makeStyles } from "@material-ui/core";

//formik
import { Form, FieldArray, Field, Formik } from "formik";
// components
import Page from "../Page";
//React
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

export default function EditQuestion() {
  const classes = useStyles();

  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState({});
  const [questionId, setQuestionId] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setQuestionId(e.target.value);
  };

  function refreshPage() {
    window.location.reload(false);
  }

  useEffect(() => {
    const apiUrl = `${API_SERVER}/api/question/${questionId}`;
    const auth = localStorage.getItem("token");
    const requestOption = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth,
      },
    };
    try {
      fetch(apiUrl, requestOption)
        .then((res) => res.json())
        .then((response) => {
          // console.log(response);
          setQuestion(response);
        });
    } catch (err) {
      console.log(err);
    }
  }, [questionId]);

  useEffect(() => {
    const apiUrl = `${API_SERVER}/api/question`;
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
          <FormControl
            variant="standard"
            sx={{ m: 1, width: "100%", pb: "5%" }}
          >
            <InputLabel>Question</InputLabel>
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
              // let data = new FormData();
              // data.append("id", question.id);

              const requestOption = {
                method: "DELETE",
                headers: {
                  Authorization: "Bearer " + auth,
                },
              };

              let url = `${API_SERVER}/api/question/${question.id}`;
              console.log(url);
              fetch(url, requestOption)
                // HTTP response
                .then((response) => {
                  //  OK
                  if (response.ok) {
                    //success
                    console.log(response);
                    return;
                  } else {
                    //fail
                    return response.json().then((data) => {
                      //show error
                      let errorMessage = "Delete Question failed!";
                      throw new Error(errorMessage);
                    });
                  }
                })
                .then(() => {
                  alert("Delete successfully");
                  refreshPage();
                })
                .catch((err) => {
                  console.log(err);
                  alert(err.message);
                });
            }}
            render={({ values, getFieldProps, setFieldValue }) => (
              <Form>
                <Stack spacing={2}>
                  <TextField
                    disabled
                    label="Content"
                    variant="outlined"
                    defaultValue={question.content}
                    {...getFieldProps("content")}
                    multiline
                    inputProps={{ className: classes.inputSelect }}
                  />
                  <center style={{ marginTop:"10px", marginBottom:"10px"}}>
                    <Paper variant="outlined" sx={{ width: "50%", height: "50%", mb:1, mt:1}}>
                      <img src={question.image} />
                    </Paper>
                  </center>
                  <TextField
                    disabled
                    label="True Answer (0->A,1->B,2->C,3->D,...)"
                    variant="outlined"
                    {...getFieldProps("trueAnswer")}
                    inputProps={{ className: classes.inputSelect }}
                  />
                  <FieldArray
                    name="answers"
                    render={(arrayHelpers) => (
                      <div>
                        <center>
                          <Typography variant="h5">Answsers </Typography>
                        </center>
                        {values.answers &&
                          values.answers.length > 0 &&
                          values.answers.map((answer, index) => (
                            <div key={index}>
                              <Field
                                disabled
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
                              />
                            </div>
                          ))}
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
        <Page title="Dashboard | LSExam">
          <Container maxWidth="xl">
            <Box sx={{ p: "15%" }}>
              <center
                style={{
                  width: "80%",
                }}
              >
                <Typography variant="h1" color="white" textAlign="center">
                  {" "}
                  Loading...{" "}
                </Typography>
                <LinearProgress color="success" />
              </center>
            </Box>
          </Container>
        </Page>
      </>
    );
  }
}
