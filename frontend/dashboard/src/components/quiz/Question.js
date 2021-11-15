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
import { selectQuestionOptions } from "../../redux/store/questionSlice";
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
});

// ----------------------------------------------------------------------

export default function Question() {
  const classes = useStyles();
  const questionOptions = useSelector(selectQuestionOptions);
  console.log(questionOptions);
  return (
    <Container>
        <Box>
          <Grid container rowSpacing={1}>
            <Grid item xs={6} sx={{ textAlign: "center" }}>
              <Typography variant="h4" sx={{ p: 7 }}>
                {" "}
                Câu hỏi 1{" "}
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
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Typography>
        </Box>
        <Stack spacing={2} sx={{ m: 1, minWidth: 500 }}>
          <Button variant="outlined" className={classes.answer}>
            A. It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </Button>
          <Button variant="outlined" className={classes.answer}>
            B. It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </Button>
          <Button variant="outlined" className={classes.answer}>
            C. It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </Button>
          <Button variant="outlined" className={classes.answer}>
            D. It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </Button>
        </Stack>
        <Box sx={{ textAlign: "center" }}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Box>
    </Container>
  );
}
