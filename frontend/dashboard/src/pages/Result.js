// material
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
// components
import Page from "../components/Page";

// Redux
import { useSelector } from "react-redux";
import { selectSubmitAnswers } from "../redux/store/answersSlice";

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
  rightAnswer: {
    backgroundColor: "#145A32",
    color: "white",
  },
  wrongAnswer: {
    backgroundColor: "#FF0000",
    color: "white",
  },
  nullAnswer: {
    backgroundColor: "#FFFF00",
    color: "#145A32",
  },
});

// ----------------------------------------------------------------------

export default function Quiz() {
  const classes = useStyles();

  const score = useSelector(selectSubmitAnswers);

  const [questions, setQuestions] = useState([]);
  const [submitedAnswers, setSubmitedAnswers] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const navigate = useNavigate();

  const next = () => {
    setCurrentQuestion((currentQuestion) => currentQuestion + 1);
  };
  const previous = () => {
    setCurrentQuestion((currentQuestion) => currentQuestion - 1);
  };

  useEffect(() => {
    const auth = localStorage.getItem("token");
    const requestOption = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth,
      },
      body: JSON.stringify({
        quizId: score.quizId,
        duration: score.duration,
        answers: score.submitedAnswers,
      }),
    };

    fetch("http://34.72.189.169:8080/api/quiz/score/", requestOption)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  },[questions]);

  useEffect(() => {
    setQuestions(score.questions);
    setSubmitedAnswers(score.submitedAnswers);
  }, [score]);

  const goHome = (e) => {
    e.preventDefault();
    navigate("/dashboard/app");
  };
  if (questions.length > 0) {
    return (
      <Page
        title="Quiz"
        sx={{
          p: "5%",
          backgroundColor: "#161d31",
          color: "white",
          height: "100%",
        }}
      >
        <Container>
          <Container>
            <Box>
              <Typography variant="h4" sx={{ p: 7 }}>
                Câu hỏi {currentQuestion + 1}
              </Typography>
            </Box>
            <Box
              sx={{
                border: 1,
                borderRadius: 2,
                m: 1,
                p: 2,
                backgroundColor: "#ABEBC6",
              }}
            >
              <Typography
                variant="paragraph"
                sx={{
                  p: 2,
                  m: 2,
                  fontWeight: "Bold",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "justify",
                  color: "#145A32",
                }}
              >
                {questions[currentQuestion].content}
              </Typography>
            </Box>
            <Box>
              <Stack spacing={2} sx={{ m: 1 }}>
                {questions[currentQuestion].answers.map((answer, iterator) => {
                  if (submitedAnswers[currentQuestion].answer !== null) {
                    if (
                      submitedAnswers[currentQuestion].answer !==
                        questions[currentQuestion].trueAnswer &&
                      questions[currentQuestion].trueAnswer === iterator
                    ) {
                      return (
                        <Button
                          variant="outlined"
                          className={classes.rightAnswer}
                        >
                          {answer}
                        </Button>
                      );
                    } else if (
                      submitedAnswers[currentQuestion].answer !==
                        questions[currentQuestion].trueAnswer &&
                      submitedAnswers[currentQuestion].answer === iterator
                    ) {
                      return (
                        <Button
                          variant="outlined"
                          className={classes.wrongAnswer}
                        >
                          {answer}
                        </Button>
                      );
                    } else if (
                      submitedAnswers[currentQuestion].answer ===
                        questions[currentQuestion].trueAnswer &&
                      questions[currentQuestion].trueAnswer === iterator
                    )
                      return (
                        <Button
                          variant="outlined"
                          className={classes.rightAnswer}
                        >
                          {answer}
                        </Button>
                      );
                    else
                      return (
                        <Button variant="outlined" className={classes.answer}>
                          {answer}
                        </Button>
                      );
                  } else {
                    if (questions[currentQuestion].trueAnswer === iterator)
                      return (
                        <Button
                          variant="outlined"
                          className={classes.nullAnswer}
                        >
                          {answer}
                        </Button>
                      );
                    else
                      return (
                        <Button variant="outlined" className={classes.answer}>
                          {answer}
                        </Button>
                      );
                  }
                })}
              </Stack>
            </Box>
          </Container>
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
              onClick={goHome}
            >
              Home
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
    return <Typography variant="h2">Loading...</Typography>;
  }
}
