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
// components
import Page from "../components/Page";
import { Clock } from "../components/_dashboard/app";
import { Question } from "../components/quiz/"

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

export default function Quiz() {

  const classes = useStyles();

  return (
    <Page title="Quiz">
      <Container>
          <Question>
          </Question>
      </Container>
    </Page>
  );
}
