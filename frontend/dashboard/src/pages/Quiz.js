// material
import { Box, Grid, Container, Typography, Button, Stack , IconButton, Tooltip, Menu, MenuItem, AppBar, Toolbar } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { useNavigate, Link } from "react-router-dom";
// components
import Page from "../components/Page";
import { Question, Timer } from "../components/quiz/";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { selectQuestionOptions } from "../redux/store/questionSlice";
import {
  setSubmitAnswers,
  setQuizId,
  setResultQuestions,
  setDuration,
} from "../redux/store/answersSlice";
import Clock from "../components/quiz/Clock";
import LinearProgress from "@mui/material/LinearProgress";

import AccountPopover from "../layouts/dashboard/AccountPopover";
import MenuIcon from '@mui/icons-material/Menu';

// ----------------------------------------------------------------------

const useStyles = makeStyles({
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
});

// ----------------------------------------------------------------------

export default function Quiz() {
  const classes = useStyles();

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const next = () => {
    setCurrentQuestion((currentQuestion) => currentQuestion + 1);
  };
  const previous = () => {
    setCurrentQuestion((currentQuestion) => currentQuestion - 1);
  };

  const questionOptions = useSelector(selectQuestionOptions);
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);

  // Set up for Result
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [quiz, setQuiz] = useState(0);
  const [trueAnswers, setTrueAnswers] = useState([]);
  const [seconds, setSeconds] = useState(questionOptions.time * 60);

  // const [timer, setTimer] = useState("00:00:00");

  const chooseAnswer = (index, value) => {
    const newAnswer = answers.slice();
    newAnswer[index] = value;
    setAnswers(newAnswer);
  };

  useEffect(() => {
    if (questionOptions.categoryId) {
      try {
        const apiUrl = `http://34.72.189.169:8080/api/quiz/create/`;
        const auth = localStorage.getItem("token");
        const requestOption = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth,
          },
          body: JSON.stringify({
            categoryId: questionOptions.categoryId,
            numberQuestions: questionOptions.numberQuestion,
          }),
        };
        fetch(apiUrl, requestOption)
          .then((res) => res.json())
          .then((response) => {
            console.log(response.data);
            setQuestions(response.data.questions);
            setQuiz(response.data.quizId);
          });
      } catch (err) {
        console.log(err);
      }
    }
    else {
      navigate("/dashboard/app")
    }
  }, []);

  useEffect(() => {
    const initValue = questions.map((question) => {
      return { questionId: question.id, answer: null };
    });
    setSelectedAnswers(initValue);
  }, [questions]);

  useEffect(() => {
    const initValue = questions.map((question) => {
      return { questionId: question.id, trueAnswer: question.trueAnswer };
    });
    setTrueAnswers(initValue);
  }, [questions]);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      submitHandler();
    }
  });

  const chooseSelectedAnswer = (index, value) => {
    const newAnswers = selectedAnswers.slice();
    newAnswers[index].answer = value;
    setAnswers(newAnswers);
  };

  console.log(selectedAnswers);

  // SubmitHandler
  const submitHandler = () => {
    // e.preventDefault();
    dispatch(setSubmitAnswers(selectedAnswers));
    dispatch(setQuizId(quiz));
    dispatch(setResultQuestions(questions));
    let timeout = questionOptions.time * 60 - seconds;
    const hours = Math.floor(timeout / 3600);
    const minutes = Math.floor((timeout - hours * 3600) / 60);
    const second = timeout - hours * 3600 - minutes * 60;
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(second);
    var duration =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    dispatch(setDuration(duration));
    navigate("/result");
  };

  if (questions.length > 0) {
    return (
      <div style={{ height: "100%", backgroundColor: "#161d31" }}>
        <React.Fragment>
          <Box>
            <Page
              title="Quiz"
              sx={{
                p: "5%",
                backgroundColor: "#161d31",
                color: "white",
              }}
            >
              <Container>
                <Grid container>
                  <Grid item xs="6" sm="6">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "right",
                        alignItems: "right",
                        mr: '5%'
                      }}
                    >
                      <Typography variant="h4" sx={{ paddingTop: 2 }}>
                        Câu hỏi {currentQuestion + 1}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs="6" sm="6">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "left",
                        ml: '5%'
                      }}
                    >
                      <Clock initTime={questionOptions.time}></Clock>
                    </Box>
                  </Grid>

                  <Grid item xs="12" sm="12">
                    <Question
                      question={questions[currentQuestion]}
                      index={currentQuestion + 1}
                      answerIndex={answers[currentQuestion]}
                      chooseAnswer={chooseAnswer}
                      chooseSelectedAnswer={chooseSelectedAnswer}
                    ></Question>
                  </Grid>

                  <Grid item xs="4" sm="4">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "left",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ mt: "10%", width: "100%" }}
                        onClick={previous}
                        disabled={currentQuestion === 0}
                      >
                        Previous
                      </Button>
                    </Box>
                  </Grid>

                  <Grid item xs="4" sm="4">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ mt: "10%", width: "50%" }}
                        onClick={submitHandler}
                      >
                        Submit
                      </Button>
                    </Box>
                  </Grid>

                  <Grid item xs="4" sm="4">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "right",
                        alignItems: "right",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ mt: "10%", width: "100%" }}
                        onClick={next}
                        disabled={currentQuestion + 1 === questions.length}
                      >
                        Next
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Page>
          </Box>
        </React.Fragment>
      </div>
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
            <LinearProgress color="success" />
          </div>
        </Page>
      </>
    );
  }
}
