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
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
// components
import Page from "../components/Page";
import { Question } from "../components/quiz/";

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
];

const answers = Array.apply(null, Array(questions.length)).map(function () {return -1});

// ----------------------------------------------------------------------

export default function Quiz() {
  const classes = useStyles();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const next = () => {
    setCurrentQuestion((currentQuestion) => currentQuestion + 1);
  };
  const previous = () => {
    setCurrentQuestion((currentQuestion) => currentQuestion - 1);
  };
  

  const [answer, setAnswer] = useState(answers);

  const chooseAnswer = (index, value) => {
    const newAnswer = answer.slice();
    newAnswer[index] = value;
    setAnswer(newAnswer);
  }

  console.log(answer);

  return (
    <Page title="Quiz">
      <Container>

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
