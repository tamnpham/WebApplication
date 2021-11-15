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
import { useNavigate } from "react-router-dom";
// components
import Page from "../components/Page";

// Redux
import { useDispatch } from "react-redux";
import { getQuestionOptions } from "../redux/store/questionSlice";

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

const categories = [
  "An toàn mạng",
  "An toàn mạng nâng cao",
  "Lập trình web",
  "Lập trình mạng cằn bản",
];

//----------------------------------------------------------------

export default function DashboardApp() {
  const [isQuiz, setIsQuiz] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const classes = useStyles();
  const defaultValues = {
    categories: "",
    numberQuestions: 0,
    time: 0,
  };
  const [questionOptions, setQuestionOptions] = useState(defaultValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestionOptions({
      ...questionOptions,
      [name]: value,
    });
  };
  const handleSliderChange = (name) => (e, value) => {
    setQuestionOptions({
      ...questionOptions,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      questionOptions.time === 0 ||
      questionOptions.numberQuestions === 0 ||
      questionOptions.categories === ""
    ) {
      setError(true);
      console.log("error");
      return;
    } else {
      dispatch(getQuestionOptions(questionOptions))
      navigate("/quiz");
    }
  };

  const makeQuizHandler = () => {
    setIsQuiz(true);
    console.log(questionOptions.time);
  };

  return (
    <Page title="Dashboard | LSExam">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Box sx={{ pb: 5 }} className={classes.center}>
          <Typography variant="h2">Let's choose option</Typography>
        </Box>
        <Box>
          <form onSubmit={handleSubmit}>
            <Grid
              container
              alignItems="center"
              justify="center"
              direction="column"
            >
              <Grid item>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 500 }}>
                  <InputLabel variant="outlined"> Chọn chủ đề </InputLabel>
                  <Select
                    name="categories"
                    value={questionOptions.categories}
                    onChange={handleInputChange}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                    ;
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <div style={{ width: "500px", textAlign: "center" }}>
                  Number Questions
                  <Slider
                    value={questionOptions.numberQuestions}
                    onChange={handleSliderChange("numberQuestions")}
                    defaultValue={1}
                    step={1}
                    min={1}
                    max={100}
                    valueLabelDisplay="on"
                  />
                </div>
              </Grid>
              <Grid item>
                <div style={{ width: "500px", textAlign: "center" }}>
                  Time (minutes)
                  <Slider
                    value={questionOptions.time}
                    onChange={handleSliderChange("time")}
                    defaultValue={1}
                    step={1}
                    min={1}
                    max={120}
                    valueLabelDisplay="on"
                  />
                </div>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={makeQuizHandler}
              >
                Submit
              </Button>
            </Grid>
          </form>
        </Box>
      </Container>
    </Page>
  );
}
