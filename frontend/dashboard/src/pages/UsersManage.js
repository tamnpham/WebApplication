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
    GetUsers,
    PromoteUser,
  } from "../components/userManage/";
  
  
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
                  <Tab label="All Users" className={classes.tab1} value="1" />
                  <Tab label="Change Role User" className={classes.tab2} value="2" />
                  <Tab label="Kick User" className={classes.tab3} value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <GetUsers />
              </TabPanel>
              <TabPanel value="2">
                <PromoteUser />
              </TabPanel>
              <TabPanel value="3">
                {/* <DeleteQuestion /> */}
              </TabPanel>

            </TabContext>
          </Box>
        </Container>
      </Page>
    );
  }
  