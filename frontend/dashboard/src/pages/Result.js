// material
import { Box, Container, Typography, Button, Stack, Grid } from "@mui/material";
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

  const result = useSelector(selectSubmitAnswers);

  const [questions, setQuestions] = useState([]);
  const [submitedAnswers, setSubmitedAnswers] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(null);

  const navigate = useNavigate();

  const next = () => {
    setCurrentQuestion((currentQuestion) => currentQuestion + 1);
  };
  const previous = () => {
    setCurrentQuestion((currentQuestion) => currentQuestion - 1);
  };

  useEffect(() => {
    if (result.quizId) {
      try {
        const auth = localStorage.getItem("token");
        const requestOption = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth,
          },
          body: JSON.stringify({
            quizId: result.quizId,
            duration: result.duration,
            answers: result.submitedAnswers,
          }),
        };

        fetch("https://34.72.189.169:8080/api/quiz/score/", requestOption)
          .then((res) => res.json())
          .then((response) => {
            console.log(response);
            setScore(response.data.score);
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    }
    else {
      navigate("/dashboard/app");
    }
  }, []);

  useEffect(() => {
    setQuestions(result.questions);
    setSubmitedAnswers(result.submitedAnswers);
  }, [result]);

  const goHome = (e) => {
    e.preventDefault();
    navigate("/dashboard/app");
  };
  if ((questions.length > 0) && (score !== null)) {
    return (
      <div style={{ height: "100%", backgroundColor: "#161d31" }}>
        <Box>
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
                <Grid container spacing={3}>
                  <Grid item xs="3">
                    <center>
                      <Typography variant="h4" sx={{ p: 1 }}>
                        Câu hỏi {currentQuestion + 1}
                      </Typography>
                    </center>
                  </Grid>
                  <Grid item xs="6">
                    <center>
                      <Typography variant="h4" sx={{ p: 1 }}>
                        Duration {result.duration}
                      </Typography>
                    </center>
                  </Grid>
                  <Grid item xs="3">
                    <center>
                      <Typography variant="h4" sx={{ p: 1 }}>
                        Score: {score}
                      </Typography>
                    </center>
                  </Grid>
                </Grid>
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
                  {questions[currentQuestion].image && (
                    <center>
                      <img
                        src={questions[currentQuestion].image}
                        alt="img question"
                        style={{
                          marginTop: "20px",
                          width: "50%",
                          height: "50%",
                        }}
                      ></img>
                    </center>
                  )}
                </Box>
                <Box>
                  <Stack spacing={2} sx={{ m: 1 }}>
                    {questions[currentQuestion].answers.map(
                      (answer, iterator) => {
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
                              <Button
                                variant="outlined"
                                className={classes.answer}
                              >
                                {answer}
                              </Button>
                            );
                        } else {
                          if (
                            questions[currentQuestion].trueAnswer === iterator
                          )
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
                              <Button
                                variant="outlined"
                                className={classes.answer}
                              >
                                {answer}
                              </Button>
                            );
                        }
                      }
                    )}
                  </Stack>
                </Box>
              </Container>

              <Grid container>
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
                      onClick={goHome}
                    >
                      Home
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
          </div>
        </Page>
      </>
    );
  }
}
