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
import { Clock } from "../components/_dashboard/app";

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

  const classes = useStyles();
  const defaultValues = {
    categories: "",
    numberQuestions: 0,
    time: 0,
  };
  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSliderChange = (name) => (e, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
    if (!formValues.time===0 || !formValues.numberQuestions===0 || !formValues.categories==="") {
      setError(true);
      return;
    } else {
      setError(false);
      // fetchQuestions(category, difficulty);
      navigate("/quiz");
    }
  };

  const makeQuizHandler = () => {
    setIsQuiz(true);
    console.log(formValues.time);
  };

  return (
    <Page title="Dashboard | LSExam">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        {!isQuiz && (
          <div>
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
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 500 }}
                    >
                      <InputLabel variant="outlined"> Chọn chủ đề </InputLabel>
                      <Select
                        name="categories"
                        value={formValues.categories}
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
                        value={formValues.numberQuestions}
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
                        value={formValues.time}
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
          </div>
        )}
        {isQuiz && (
          <div>
            <Box>
              <Grid container rowSpacing={1}>
                <Grid item xs={6} sx={{ textAlign: "center" }}>
                  <Typography variant="h4" sx={{ p: 7 }}>
                    {" "}
                    Câu hỏi 1{" "}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Clock initTime={formValues.time}></Clock>
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
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Typography>
            </Box>
            <Stack spacing={2} sx={{ m: 1, minWidth: 500 }}>
              <Button variant="outlined" className={classes.answer}>
                A. It is a long established fact that a reader will be
                distracted by the readable content of a page when looking at its
                layout.
              </Button>
              <Button variant="outlined" className={classes.answer}>
                B. It is a long established fact that a reader will be
                distracted by the readable content of a page when looking at its
                layout.
              </Button>
              <Button variant="outlined" className={classes.answer}>
                C. It is a long established fact that a reader will be
                distracted by the readable content of a page when looking at its
                layout.
              </Button>
              <Button variant="outlined" className={classes.answer}>
                D. It is a long established fact that a reader will be
                distracted by the readable content of a page when looking at its
                layout.
              </Button>
            </Stack>
            <Box sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={() => setIsQuiz(false)}
              >
                Submit
              </Button>
            </Box>
          </div>
        )}
      </Container>
    </Page>
  );
}
