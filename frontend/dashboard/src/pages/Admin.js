// material
import {
  Container,
  Box,
  Tab,
} from "@mui/material";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import { makeStyles } from "@material-ui/core";

import Page from "../components/Page";
import {
  AddPost,
  AddQuestion,
  DeleteQuestion,
  EditQuestion,
  EditPost,
  DeletePost,
  AddCategory,
  EditCategory,
  DeleteCategory,
} from "../components/admin/";


//React
import { useState, useEffect } from "react";
import dotenv from "dotenv";
dotenv.config();
const API_SERVER=process.env.REACT_APP_LSEXAM_API_SERVER; 
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
  tab1: {
    color: "pink"
  },
  tab2: {
    color: "yellow"
  },
  tab3: {
    color: "green"
  }
});

// ----------------------------------------------------------------------

export default function Admin() {
  const classes = useStyles();

  const [valueTab, setValueTab] = useState("1");


  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

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
                classes={{ root: classes.root, scroller: classes.scroller }}
              >
                <Tab label="Add question" className={classes.tab1} value="1" />
                <Tab label="Edit question" className={classes.tab1} value="2" />
                <Tab label="Delete question" className={classes.tab1} value="3" />
                <Tab label="Add Post" className={classes.tab2} value="4" />
                <Tab label="Edit Post" className={classes.tab2} value="5" />
                <Tab label="Delete Post" className={classes.tab2} value="6" />
                <Tab label="Add Category" className={classes.tab3} value="7" />
                <Tab label="Edit Category" className={classes.tab3} value="8" />
                <Tab label="Delete Category" className={classes.tab3} value="9" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <AddQuestion />
            </TabPanel>
            <TabPanel value="2">
              <EditQuestion />
            </TabPanel>
            <TabPanel value="3">
              <DeleteQuestion />
            </TabPanel>
            <TabPanel value="4">
              <AddPost />
            </TabPanel>
            <TabPanel value="5">
              <EditPost />
            </TabPanel>
            <TabPanel value="6">
              <DeletePost />
            </TabPanel>
            <TabPanel value="7">
              <AddCategory />
            </TabPanel>
            <TabPanel value="8">
              <EditCategory />
            </TabPanel>
            <TabPanel value="9">
              <DeleteCategory />
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </Page>
  );
}
