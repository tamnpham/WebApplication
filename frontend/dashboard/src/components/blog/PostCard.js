import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));



export default function ActionAreaCard() {
  const [posts, setPosts] = useState(null);

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
        setPosts(response);
        console.log(response);
      });
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
      <Typography>Loading...</Typography>
    );
  }
}
