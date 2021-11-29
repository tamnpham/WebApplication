// material
import { Container, Typography, Grid, Paper,Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import ReactMarkdown from 'react-markdown';
import LinearProgress from '@mui/material/LinearProgress';
// components
import Page from '../components/Page';
import {
    useParams
  } from "react-router-dom";
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


// const rootStyle = styled(Body)
// ----------------------------------------------------------------------

export default function Post() {

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
            //
            // setPostState(posts[id]);
            // fetchPostData()
          },[])
      
    if (postState != null) {
    return (
      // <div sx={{width: '100%', height: '100%', backgroundColor: '#161d31'}}>
      <Page
        title="Post Page"
        sx={{
          p: "5%",
          backgroundColor: "#161d31",
          color: "white",
          height: "100%",
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
      // </div>
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
