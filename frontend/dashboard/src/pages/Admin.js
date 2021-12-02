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
} from "@mui/material";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import { makeStyles } from "@material-ui/core";

//formik
import {
  Form,
  FieldArray,
  Field,
  Formik,
} from "formik";
// components

import Page from "../components/Page";
import {AddQuestion, DeleteQuestion, EditQuestion} from '../components/admin/'

//React
import { useState, useEffect } from "react";

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
  inputSelect: {
    color: "white",
  },
});

// ----------------------------------------------------------------------

export default function Admin() {
  const classes = useStyles();

  const [valueTab, setValueTab] = useState("1");

  const [categories, setCategories] = useState([]);

  const defaultValues = {
    categoryId: "",
    title: "",
    content: "",
    answers: [""],
    trueAnswer: 0,
    image: "",
  };
  const [questionData, setQuestionData] = useState(defaultValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({
      ...questionData,
      [name]: value,
    });
  };

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

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
        console.log(response.length);
        setCategories(response);
      });
  }, []);

  return (
    <Page title="Admin Page">
      <Container>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={valueTab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChangeTab}
                aria-label="Question Tab"
                centered
              >
                <Tab label="Edit question" value="1" />
                <Tab label="Add question" value="2" />
                <Tab label="Delete question" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <EditQuestion />
            </TabPanel>
            <TabPanel value="2">
              <AddQuestion 
                // questionData={questionData}
                // categories={categories}
              />
            </TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
          </TabContext>
        </Box>
      </Container>
    </Page>
  );
}
