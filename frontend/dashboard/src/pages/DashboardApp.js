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

import React, { useState, useEffect } from "react";
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
  inputSelect: {
    color: "white",
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
    categoryId: "",
    numberQuestion: 0,
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
      questionOptions.numberQuestion === 0 ||
      questionOptions.categoryId === ""
    ) {
      setError(true);
      console.log("error");
      return;
    } else {
      dispatch(getQuestionOptions(questionOptions));
      navigate("/quiz");
    }
  };

  const makeQuizHandler = () => {
    setIsQuiz(true);
    console.log(questionOptions.time);
  };

  const [options, setOptions] = useState(null);

  useEffect(() => {
    const apiUrl = `http://34.72.189.169:8080/api/category`;
    const auth = localStorage.getItem("token");
    const requestOption = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth,
      },
    };
    fetch(apiUrl, requestOption)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setOptions(response);
      });
  }, []);

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
                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel variant="outlined"> Chọn chủ đề </InputLabel>
                  <Select
                    name="categoryId"
                    value={questionOptions.categoryId}
                    onChange={handleInputChange}
                    inputProps={{ className: classes.inputSelect }}
                  >
                    {options &&
                      options.length &&
                      options.map((option) => (
                        <MenuItem value={option.id} key={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <div style={{ textAlign: "center", minWidth: "200px" }}>
                  Number Questions
                  <Slider
                    value={questionOptions.numberQuestion}
                    onChange={handleSliderChange("numberQuestion")}
                    defaultValue={1}
                    step={1}
                    min={1}
                    // max={options.length}
                    max={100}
                    valueLabelDisplay="on"
                  />
                </div>
              </Grid>
              <Grid item>
                <div style={{ textAlign: "center", minWidth: "200px" }}>
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
