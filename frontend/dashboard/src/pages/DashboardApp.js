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
  Slider,
  Button,
  Stack,
} from "@mui/material";

import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
// components
import Page from "../components/Page";

// Redux
import { useDispatch } from "react-redux";
import { getQuestionOptions } from "../redux/store/questionSlice";
import { AuthContext } from "../store/auth-context";
import LinearProgress from '@mui/material/LinearProgress';

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

  const [options, setOptions] = useState([]);
  const authCtx = useContext(AuthContext);

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
        setOptions(response);
      });
  },[]);

  if (options.length > 0) {
    return (
      <Page title="Dashboard | LSExam">
        <Container maxWidth="xl">
          <Box sx={{ pb: 5 }}>
            <Typography variant="h4">
              Hi, {authCtx.firstName} {authCtx.lastName}
            </Typography>
          </Box>
          <Box sx={{ pb: 5 }} className={classes.center}>
            <Typography variant="h2">Let's choose option</Typography>
          </Box>
          <Box>
            <form onSubmit={handleSubmit}>
              <Grid
                // container
                // display="flex"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                // direction="column"
                columns={{ xs: 1, sm: 1, md: 1 }}
              >
                <Grid item xs={10} sm={6} sx={{ pt: "2%", pb: "2%" }}>
                  <FormControl variant="standard" sx={{ m: 1, width: "50%" }}>
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

                <Grid
                  item
                  xs={10}
                  sm={6}
                  sx={{ pt: "2%", pb: "2%", ml: "25%", mr: "25%" }}
                >
                  <div style={{ textAlign: "center", width: "100%" }}>
                    Number Questions
                    <Slider
                      value={questionOptions.numberQuestion}
                      onChange={handleSliderChange("numberQuestion")}
                      defaultValue={1}
                      step={1}
                      min={1}
                      max={100}
                      valueLabelDisplay="on"
                      width="100%"
                    />
                  </div>
                </Grid>

                <Grid
                  item
                  xs={10}
                  sm={6}
                  sx={{ pt: "2%", pb: "2%", ml: "25%", mr: "25%" }}
                >
                  <div style={{ textAlign: "center", width: "100%" }}>
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
                <Grid item xs={10} sm={6} sx={{ pt: "2%", pb: "2%" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    // onClick={makeQuizHandler}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Container>
      </Page>
    );
  } else {
    return (
      <>
        <Page title="Dashboard | LSExam">
          <Container maxWidth="xl" >
            <Box sx={{p: '25%'}}>
              <center
                style={{
                  width: "80%",
                }}
              >
                <Typography variant="h1" color="white" textAlign="center">
                  {" "}
                  Loading...{" "}
                </Typography>
                <LinearProgress color="success" />
              </center>
            </Box>
          </Container>
        </Page>
      </>
    );
  }
}
