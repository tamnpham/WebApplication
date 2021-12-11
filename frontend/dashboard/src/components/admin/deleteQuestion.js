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
  LinearProgress,
  Autocomplete
} from "@mui/material";

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
  input: {
    color: "white",
    textAlign: "center"
  },
});

export default function EditQuestion() {
  const classes = useStyles();

  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState({});
  const [questionId, setQuestionId] = useState(null);
  const navigate = useNavigate();

    
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState('');
  const [ok, setOk] = useState(false);


  function refreshPage() {
    window.location.reload(false);
  }

  const handleInputChange = (value) => {
    console.log(value);
    const apiUrl = `${API_SERVER}/api/question/${value}`;
    console.log(apiUrl);
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
          setQuestion(response);
          setOk(true);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
    const apiUrl = `${API_SERVER}/api/question/`;
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
        const questions = response.map((question) => {
          return {label: question.content, id: question.id};
        });
        setOptions(questions);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
        <Stack sx={{mb: "30px", width: "100%"}}>
        <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                if (newValue !== null) {
                  console.log(newValue.id);
                  setValue(newValue.id);
                  handleInputChange(newValue.id);
                }
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="controllable-states-demo"
              options={options}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Question"
                  inputProps={{
                    ...params.inputProps,
                    className: classes.input
                  }}
                />
              )}
            />
      </Stack>

        {question.id && ok === true && (
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
                  // refreshPage();
                  setOk(false)
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
