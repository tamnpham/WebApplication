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

export default function Question({
  question,
  index,
  answerIndex,
  chooseAnswer,
  chooseSelectedAnswer
}) {

  const classes = useStyles();

  return (
    <Container>
      <Box>
        <Typography variant="h4" sx={{ p: 7 }}>
          Câu hỏi {index}
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
          {question.content}
        </Typography>
      </Box>
      <Box>
        <Stack spacing={2} sx={{ m: 1}}>
          {question.answers.map((answer, iterator) => {
            return (
              <Button
                variant="outlined"
                className={
                  iterator === answerIndex
                    ? classes.chooseAnswer
                    : classes.answer
                }
                onClick={() => {
                  chooseSelectedAnswer(index - 1, iterator);
                  chooseAnswer(index - 1, iterator);
                }}
              >
                {answer}
              </Button>
            );
          })}
        </Stack>
      </Box>
    </Container>
  );
}
