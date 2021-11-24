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

// Redux
import { useSelector } from "react-redux";
import { selectQuestionOptions } from "../../redux/store/questionOptionSlice";
import Clock from "./Clock";
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
  chooseAnswer: {
    backgroundColor: "#145A32",
    color: "white",
  },
});

// ----------------------------------------------------------------------

export default function Question({ question, index, answerIndex, chooseAnswer}) {
  const classes = useStyles();
  const questionOptions = useSelector(selectQuestionOptions);

  return (
    <Container>
      <Box>
        <Grid container rowSpacing={1}>
          <Grid item xs={6} sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={{ p: 7 }}>
              Câu hỏi {index}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Clock initTime={questionOptions.time}></Clock>
          </Grid>
        </Grid>
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
          {question.question}
        </Typography>
      </Box>
      <Stack spacing={2} sx={{ m: 1, minWidth: 500 }}>
        {question.answers.map((answer, iterator) => {
          return (
            <Button
              variant="outlined"
              className={
                iterator === answerIndex ? classes.chooseAnswer : classes.answer
              }
              onClick={() => chooseAnswer(index-1, iterator)}
            >
              {answer}
            </Button>
          );
        })}
        {/* <Button variant="outlined" className={classes.chooseAnswer}>
          {question.answers[0]}
        </Button>
        <Button variant="outlined" className={classes.answer}>
          {question.answers[1]}
        </Button>
        <Button variant="outlined" className={classes.answer}>
          {question.answers[2]}
        </Button>
        <Button variant="outlined" className={classes.answer}>
          {question.answers[3]}
        </Button> */}
      </Stack>
    </Container>
  );
}
