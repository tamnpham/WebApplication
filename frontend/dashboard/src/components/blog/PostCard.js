import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { NavLink } from 'react-router-dom'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function createData(id, imgLink, by, time, title, content) {
  return { id, imgLink, by, time, title, content };
}

const posts = [
  createData(
      "0",
      "https://media.istockphoto.com/photos/top-view-of-a-blue-desktop-with-copy-space-picture-id1278436436?b=1&k=20&m=1278436436&s=170667a&w=0&h=QrFR5_k1AKgs-1ypGE0QhqHQlqZzBYbtVafn7rD8sUQ=",
      "tamnpham",
      "27/11/2021",
      "Giới thiệu LSExam",
      `<h1>What is Lorem Ipsum?</h1>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      
      Why do we use?
      It is a long established fact that a reader will be distracted by the readable content of a when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
      
      Where does come from?
      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, comes from a line in section 1.10.32.
      
      The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`
  ),
  createData(
      "1",
      "https://www.aihr.com/wp-content/uploads/Learning-and-development.png",
      "trivonhan",
      "24/11/2021",
      "Giới thiệu LSExam",
      "Trang  giới thiệu về LSExxam"
  ),
  createData(
      "2",
      "https://www.rlc2000.com/wp-content/uploads/2019/10/Powerful-Learning.png",
      "tamnpham",
      "27/11/2021",
      "Deep Learning with Javascript",
      "Trang  giới thiệu về LSExxam"
  ),
];

export default function ActionAreaCard() {
    return (
      <>
        <Grid container>
          {posts.map((post) => (
            <Grid item xs={12} sm={4} xl={4}>
              <Item sx={{ backgroundColor: "#161d31" }}>
              <NavLink to={'/post/'+post.id} style={{ textDecoration: 'none' }}>
                <Card
                  sx={{ maxWidth: 345 }}
                  // onClick={(event) => {redirect(post.id)}}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={post.imgLink}
                      alt=""
                    />
                    <CardContent
                      sx={{ backgroundColor: "#161d31", color: "white" }}
                    >
                      <Typography gutterBottom variant="h5" component="div">
                        {post.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        By {post.by}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Posted {post.time}
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
}
