// material
import {
  Container,
  Box,
  Tab,
} from "@mui/material";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import { makeStyles } from "@material-ui/core";

import Page from "../components/Page";
import {AddPost, AddQuestion, DeleteQuestion, EditQuestion, EditPost} from '../components/admin/'


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
  scroller: {
    flexGrow: "0"
  },
  root: {
    justifyContent: "center"
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
                variant="scrollable"
                classes={{root: classes.root, scroller: classes.scroller}}
              >
                <Tab label="Edit question" value="1" />
                <Tab label="Add question" value="2" />
                <Tab label="Delete question" value="3" />
                <Tab label="Add Post" value="4" />
                <Tab label="Edit Post" value="5" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <EditQuestion />
            </TabPanel>
            <TabPanel value="2">
              <AddQuestion />
            </TabPanel>
            <TabPanel value="3">
              <DeleteQuestion />
            </TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
            <TabPanel value="4">
              <AddPost />
            </TabPanel>
            <TabPanel value="5">
              <EditPost />
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </Page>
  );
}
