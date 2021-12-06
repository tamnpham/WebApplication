import * as React from 'react';
import { useState, useEffect } from 'react';
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
import ScoreTable from './ScoreTable';
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from '@mui/material/LinearProgress';
import Page from "../Page";

const useStyles = makeStyles({
  input: {
    color: "white"
  },
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



export default function CenteredTab() {
  const classes = useStyles();
  const [scoreData, setScoreData] = useState([]);
  const [options, setOptions] = useState([]);
  const [ok, setOK] = useState(false);

  useEffect(() => {
    const apiUrl = `https://34.72.189.169:8080/api/category`;
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const apiUrl = `https://34.72.189.169:8080/api/quiz/result/`;
    const auth = localStorage.getItem("token");

    const request = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth,
      },
      body: JSON.stringify({
        categoryId: value,
      }),
    };

    fetch(apiUrl, request)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setScoreData(response.data);
        setOK(true)
      });
  };

  return (
    <>
      <Box sx={{ width: "100%", typography: "body1", pt: "5%" }}>
        <Box
          sx={{ textAlign: "center" }}
        >
          <FormControl variant="standard" sx={{ m: 1, width: "50%", pb: "5%" }}>
            <InputLabel variant="outlined"> Chọn chủ đề </InputLabel>
            <Select
              name="categoryId"
              // value={questionOptions.categoryId}
              onChange={handleInputChange}
              inputProps={{ className: classes.inputSelect }}
            >
              {options &&
                options.length > 0 &&
                options.map((option) => (
                  <MenuItem value={option.id} key={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>

        {ok === true && <ScoreTable data={scoreData} length={scoreData.length} />}
      </Box>
    </>
  );
}