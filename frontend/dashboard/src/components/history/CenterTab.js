import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
} from "@mui/material";
import ScoreTable from './ScoreTable';
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from '@mui/material/Autocomplete';
import Page from "../Page";
import dotenv from "dotenv";
dotenv.config();
const API_SERVER=process.env.REACT_APP_LSEXAM_API_SERVER; 

const useStyles = makeStyles({
  input: {
    color: "white",
    textAlign: "center"
  },
  typography: {
    position: "absolute",
    left: "50%",
    transform: "(-50%,50%)",
  },
  center: {
    textAlign: "center",
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


  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      try {
        const apiUrl = `${API_SERVER}/api/category`;
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
            const categories = response.map((category) => {
              return { label: category.name, id: category.id };
            });
            setOptions(categories);
          });
      } catch (err) {
        alert(err);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (categoryId) => {
    console.log(categoryId);
    try {
      const apiUrl = `${API_SERVER}/api/quiz/result/`;
      const auth = localStorage.getItem("token");

      
      const request = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
        body: JSON.stringify({
          categoryId: categoryId,
        }),
      };

      fetch(apiUrl, request)
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          setScoreData(response.data);
          setOK(true);
        });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <Box sx={{ width: "100%", typography: "body1", pt: "5%" }}>
        <Box sx={{ textAlign: "center", mb: "5%" }}>
          <center>
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                if (newValue !== null) {
                  setValue(newValue.id);
                  handleInputChange(newValue.id);
                }
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="controllable-states-demo"
              options={options}
              sx={{ width: "50%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Category"
                  inputProps={{
                    ...params.inputProps,
                    className: classes.input,
                  }}
                />
              )}
            />
          </center>
        </Box>

        {ok === true && (
          <ScoreTable data={scoreData} length={scoreData.length} />
        )}
      </Box>
    </>
  );
}