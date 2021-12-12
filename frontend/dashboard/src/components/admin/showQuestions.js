// material
import {
  Container,
  Box,
  Tab,
  Grid,
  MenuItem,
  Button,
  Select,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  LinearProgress,
  Typography,
} from "@mui/material";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import { makeStyles } from "@material-ui/core";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { AuthContext } from "../../store/auth-context";

// components
import Page from "../Page";
//React
import { useState, useEffect, useContext } from "react";

import dotenv from "dotenv";
dotenv.config();
const API_SERVER = process.env.REACT_APP_LSEXAM_API_SERVER;

// --------------------------------------------

const useStyles = makeStyles({
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
  dataGrid: {
    ".MuiDataGrid-cell": {
      wordBreak: "break-all",
      maxHeight: "fit-content!important",
      overflow: "auto",
      whiteSpace: "initial!important",
      lineHeight: "16px!important",
      display: "flex!important",
      alignItems: "center",
      paddingTop: "10px!important",
      paddingBottom: "10px!important",
    },
    ".MuiDataGrid-cell div": {
      maxHeight: "inherit",
      width: "100%",
      whiteSpace: "initial",
      lineHeight: "16px",
    },
  },
});

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "categoryContent", headerName: "Category", width: 250 },
  { field: "content", headerName: "Question", width: 650 },
];

export default function ShowQuestions() {
  const classes = useStyles();

  const authCtx = useContext(AuthContext);

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    try {
      const apiUrl = `${API_SERVER}/api/question/`;
      const auth = authCtx.token;
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
        .then((questions) => {
          let reformatQuestions = questions.map((question) => {
            return {
              id: question.id,
              content: question.content,
              categoryContent: question.categoryInfo.name,
            };
          });
          setQuestions(reformatQuestions);
          console.log(reformatQuestions);
        });
    } catch (err) {
      console.log(err);
      //   navigate("/login");
    }
  }, []);

  if (questions.length > 0) {
    return (
      <Container>
        <div style={{ height: 500, width: "100%", backgroundColor: "white" }}>
          <DataGrid
            rows={questions}
            columns={columns}
            sx={{
              ".MuiDataGrid-cell": {
                wordBreak: "break-all",
                maxHeight: "fit-content!important",
                overflow: "auto",
                whiteSpace: "initial!important",
                lineHeight: "16px!important",
                display: "flex!important",
                alignItems: "center",
                paddingTop: "10px!important",
                paddingBottom: "10px!important",
              },
              ".MuiDataGrid-cell div": {
                maxHeight: "inherit",
                width: "100%",
                whiteSpace: "initial",
                lineHeight: "16px",
              },
            }}
          />
        </div>
      </Container>
    );
  } else {
    return (
      <>
        <Page title="Dashboard | LSExam">
          <Container maxWidth="xl">
            <Box sx={{ p: "25%" }}>
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
