import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid, LinearProgress, Container, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { NavLink } from 'react-router-dom'
import Page from "../../components/Page";
import { useEffect, useState } from 'react';
import dotenv from "dotenv";
dotenv.config();
const API_SERVER=process.env.REACT_APP_LSEXAM_API_SERVER; 

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ActionAreaCard() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    try {
      //fetch data from server
      const apiUrl = `${API_SERVER}/api/blog/`;
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
          const processedPost = response.map((p) => {
            const dateParse = new Date(p.created);
            const days = [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ];
            const months = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ];

            const day = dateParse.getDay();
            const date = dateParse.getDate();
            const month = dateParse.getMonth();
            const year = dateParse.getFullYear();
            const time =
              days[day] + ", " + date + " " + months[month] + " " + year;
            console.log(time);
            return { ...p, created: time };
          });
          setPosts(processedPost);
        });
    } catch (err) {
      alert(err);
    }
  }, []);

  if (posts != null) {
    return (
      <>
        <Grid container>
          {posts.map((post) => (
            <Grid item xs={12} sm={4} xl={4}>
              <Item sx={{ backgroundColor: "#161d31" }}>
                <NavLink
                  to={"/post/" + post.id}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    sx={{ maxWidth: 345 }}
                    // onClick={(event) => {redirect(post.id)}}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={post.image_url}
                        alt=""
                      />
                      <CardContent
                        sx={{ backgroundColor: "#161d31", color: "white" }}
                      >
                        <Typography gutterBottom variant="h5" component="div">
                          {post.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          By {post.author.first_name} {post.author.last_name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Posted {post.created}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </NavLink>
              </Item>
            </Grid>
          ))}
        </Grid>
      </>
    );
  } else {
    return (
      <>
        <Page title="Dashboard | LSExam">
          <Container maxWidth="xl">
            <Box sx={{ p: "15%" }}>
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
