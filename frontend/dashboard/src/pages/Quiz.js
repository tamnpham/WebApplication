// material
import { Box, Grid, Container, Typography, Button, Stack } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
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
} from "../redux/store/answersSlice";
import Clock from "../components/quiz/Clock";

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
    const fetchData = async () => {
      await fetch(apiUrl, requestOption)
        .then((res) => res.json())
        .then((response) => {
          setQuestions(response.data.questions);
          setQuiz(response.data.quizId);
        });
    };
    fetchData();
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
      // setSeconds('BOOOOM!');
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
    navigate("/result");
  };

  if (questions.length > 0) {
    return (
      <Page
        title="Quiz"
        sx={{
          p: "5%",
          backgroundColor: "#161d31",
          color: "white",
          height: "200%",
        }}
      >
        <Container>
          <Grid container >
            <Grid item xs="6">
              <center>
              <Typography variant="h4" sx={{paddingTop: 2 }}>
                Câu hỏi {currentQuestion + 1}
              </Typography>
              </center>
            </Grid>
            <Grid item xs="6">
              <center><Clock initTime={questionOptions.time}></Clock></center>
            </Grid>
          </Grid>

          <Question
            question={questions[currentQuestion]}
            index={currentQuestion + 1}
            answerIndex={answers[currentQuestion]}
            chooseAnswer={chooseAnswer}
            chooseSelectedAnswer={chooseSelectedAnswer}
          ></Question>

          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ m: 2, width: 100 }}
              onClick={previous}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ m: 2 }}
              onClick={submitHandler}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ m: 2, width: 100 }}
              onClick={next}
              disabled={currentQuestion + 1 === questions.length}
            >
              Next
            </Button>
          </Box>
        </Container>
      </Page>
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
              {" "}
              Loading...{" "}
            </Typography>
          </div>
        </Page>
      </>
    );
  }
}
