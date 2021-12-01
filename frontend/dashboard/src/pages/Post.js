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
          const apiUrl = `http://34.72.189.169:8080/api/blog/`;
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
              
              setPostState(response[id]);
              
            });

          },[])
      
    if (postState != null) {
    return (
      <>
        <React.Fragment>
          <CssBaseline />
          <ElevationScroll {...props}>
            <AppBar>
              <Toolbar sx={{ backgroundColor: "#b8b9d1" }}>
                <Button variant="contained" color="primary" component={Link} to="/dashboard/app">
                  Home
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
                height: "100%",
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
                    {/* <ReactMarkdown>{postState.content}</ReactMarkdown> */}
                    <Typography>
                      What is Lorem Ipsum? Lorem Ipsum is simply dummy text of
                      the printing and typesetting industry. Lorem Ipsum has
                      been the industry's standard dummy text ever since the
                      1500s, when an unknown printer took a galley of type and
                      scrambled it to make a type specimen book. It has survived
                      not only five centuries, but also the leap into electronic
                      typesetting, remaining essentially unchanged. It was
                      popularised in the 1960s with the release of Letraset
                      sheets containing Lorem Ipsum passages, and more recently
                      with desktop publishing software like Aldus PageMaker
                      including versions of Lorem Ipsum. Why do we use it? It is
                      a long established fact that a reader will be distracted
                      by the readable content of a page when looking at its
                      layout. The point of using Lorem Ipsum is that it has a
                      more-or-less normal distribution of letters, as opposed to
                      using 'Content here, content here', making it look like
                      readable English. Many desktop publishing packages and web
                      page editors now use Lorem Ipsum as their default model
                      text, and a search for 'lorem ipsum' will uncover many web
                      sites still in their infancy. Various versions have
                      evolved over the years, sometimes by accident, sometimes
                      on purpose (injected humour and the like). Where does it
                      come from? Contrary to popular belief, Lorem Ipsum is not
                      simply random text. It has roots in a piece of classical
                      Latin literature from 45 BC, making it over 2000 years
                      old. Richard McClintock, a Latin professor at
                      Hampden-Sydney College in Virginia, looked up one of the
                      more obscure Latin words, consectetur, from a Lorem Ipsum
                      passage, and going through the cites of the word in
                      classical literature, discovered the undoubtable source.
                      Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de
                      Finibus Bonorum et Malorum" (The Extremes of Good and
                      Evil) by Cicero, written in 45 BC. This book is a treatise
                      on the theory of ethics, very popular during the
                      Renaissance. The first line of Lorem Ipsum, "Lorem ipsum
                      dolor sit amet..", comes from a line in section 1.10.32.
                      The standard chunk of Lorem Ipsum used since the 1500s is
                      reproduced below for those interested. Sections 1.10.32
                      and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero
                      are also reproduced in their exact original form,
                      accompanied by English versions from the 1914 translation
                      by H. Rackham.
                    </Typography>
                  </Grid>
                </Grid>
              </Container>
            </Page>
          </Box>
        </React.Fragment>
      </>
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
