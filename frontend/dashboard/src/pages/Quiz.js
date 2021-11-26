// material
import {
  Box,
  Grid,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
  Button,
  Stack,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
// components
import Page from "../components/Page";
import { Question, Timer } from "../components/quiz/";

// Redux
import { useSelector } from "react-redux";
import { selectQuestionOptions } from "../redux/store/questionSlice";
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

const questions = [
  {
    questionId: 1,
    question: "Where does it come from?",
    answers: [
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    ],
  },
  {
    questionId: 2,
    question:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    answers: [
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    ],
  },
  {
    questionId: 3,
    question: "Where can I get some?",
    answers: [
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    ],
  },
  {
    questionId: 4,
    question:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    answers: [
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    ],
  },
  {
    questionId: 5,
    question:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    answers: [
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.z",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    ],
  },
];

const answers = Array.apply(null, Array(questions.length)).map(function () {
  return -1;
});

// ----------------------------------------------------------------------

export default function Quiz() {
  const classes = useStyles();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const navigate = useNavigate();

  const next = () => {
    setCurrentQuestion((currentQuestion) => currentQuestion + 1);
  };
  const previous = () => {
    setCurrentQuestion((currentQuestion) => currentQuestion - 1);
  };

  const questionOptions = useSelector(selectQuestionOptions);

  const [answer, setAnswer] = useState(answers);

  const chooseAnswer = (index, value) => {
    const newAnswer = answer.slice();
    newAnswer[index] = value;
    setAnswer(newAnswer);
  };

  const [options, setOptions] = useState(null);
  console.log(questionOptions)
  useEffect(() => {
    // const apiUrl = `https://opentdb.com/api.php?amount=${questionOptions.numberQuestion}&category=${questionOptions.categoryId}`;
    // console.log(apiUrl)
    // fetch(apiUrl)
    //   .then((res) => res.json())
    //   .then((response) => {
    //     setOptions(response.results);
    //     // setAnswer(Array.apply(null, Array(response.results.length)).map(function () {
    //     //   return -1;
    //     // }))
    //   });
    const apiUrl = `http://34.72.189.169:8080/api/question/quiz`;
    const auth = localStorage.getItem("token");
    const requestOption = {
      method: 'POST',
       headers:{
         Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': "Bearer " + auth,
        },
        body: JSON.stringify({
          category_id: questionOptions.categoryId,
          n_questions: questionOptions.numberQuestion
        })
    }
    fetch(apiUrl, requestOption)
      .then((res) => res.json())
      .then((response) => {
        console.log(response.data);
        setOptions(response);
      });
  }, [setOptions]);
  // console.log(answer.length)
  console.log(options)
  // SubmitHandler
  const submitHandler = () => {
    console.log(answer);
    navigate("/dashboard/app");
  };

  return (
    <Page title="Quiz">
      <Container>
        <Clock initTime={questionOptions.time}></Clock>
        <Timer initTime={questionOptions.time} submitHandler={submitHandler}></Timer>
        <Question
          question={questions[currentQuestion]}
          index={currentQuestion + 1}
          answerIndex={answer[currentQuestion]}
          chooseAnswer={chooseAnswer}
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
}
