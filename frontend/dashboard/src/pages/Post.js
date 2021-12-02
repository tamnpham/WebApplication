// material
import { Container, Typography, Grid, Paper,Box, Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import ReactMarkdown from 'react-markdown';
import LinearProgress from '@mui/material/LinearProgress';
// components
import Page from '../components/Page';
import {
    useParams
  } from "react-router-dom";
import { useEffect, useState } from 'react';
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { Link } from 'react-router-dom';
// import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};


// ----------------------------------------------------------------------

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
 

// const rootStyle = styled(Body)
// ----------------------------------------------------------------------

export default function Post(props) {

    const { id } = useParams();
    const [postState, setPostState] = useState(null);

    useEffect(() => {
          //fetch data from server
          const apiUrl = 'http://34.72.189.169:8080/api/blog/'+id;
          const auth = localStorage.getItem("token");
    
          const request = {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + auth,
            },
          };
    
          fetch(apiUrl, request)
            .then((res) => res.json())
            .then((response) => {
              
              setPostState(response);
              
            });

          },[])
      
    if (postState != null) {
    return (
      <div style={{height: '100%', backgroundColor: "#161d31"}}>
        <React.Fragment>
          <CssBaseline />
          <ElevationScroll {...props}>
            <AppBar>
              <Toolbar sx={{ backgroundColor: "#b8b9d1" }}>
                <Button variant="contained" color="primary" component={Link} to="/dashboard/app" sx={{mr: '1%'}}>
                  Home
                </Button>
                <Button variant="contained" color="primary" component={Link} to="/dashboard/blog" sx={{mr: '1%'}}>
                  Blogs
                </Button>
                <Button variant="contained" color="primary" component={Link} to="/dashboard/blog">
                  Edit
                </Button>
              </Toolbar>
            </AppBar>
          </ElevationScroll>
          <Toolbar />
          <Box>
            <Page
              title="Post Page"
              sx={{
                p: "5%",
                backgroundColor: "#161d31",
                color: "white",
                height: "200%",
                width: "100%",
              }}
            >
              <Container>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12} xl={12}>
                    <Typography variant="h1">{postState.title}</Typography>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} xl={12}>
                    <Typography variant="body1">
                      By {postState.author} , created {postState.created}
                    </Typography>
                    <Typography variant="body1">
                      Last modified {postState.modified}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} xl={12}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img alt="" src={postState.imgLink} width="50%" />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} xl={12}>
                    <ReactMarkdown>{postState.content}</ReactMarkdown>
                  </Grid>
                </Grid>
              </Container>
            </Page>
          </Box>
        </React.Fragment>
      </div>
    );
  } else {
    return (
      <>
        <Page
          sx={{
            p: "5%",
            backgroundColor: "#161d31",
            color: "white",
            height: "100%",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: '80%',
              transform: "translate(-50%, -50%)",
            }}
          >
            <Typography variant="h1" color='white' textAlign='center'> Loading... </Typography>
            <LinearProgress color="success" />
          </div>
        </Page>
      </>
    );
  }
}
