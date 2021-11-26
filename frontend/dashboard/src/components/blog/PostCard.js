import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
function createData(imgLink, title, content) {
  return { imgLink, title, content };
}

const posts = [
  createData(
    "https://elearningindustry.com/wp-content/uploads/2020/05/blended-learning-learn-6-benefits.jpg",
    "Giới thiệu LSExam",
    "Trang  giới thiệu về LSExxam"
  ),
  createData(
    "https://www.aihr.com/wp-content/uploads/Learning-and-development.png",
    "Giới thiệu LSExam",
    "Trang  giới thiệu về LSExxam"
  ),
  createData(
    "https://www.rlc2000.com/wp-content/uploads/2019/10/Powerful-Learning.png",
    "Deep Learning with Javascript",
    "Trang  giới thiệu về LSExxam"
  ),
  createData(
    "https://engineering.fb.com/wp-content/uploads/2021/01/RankingFlow.jpg",
    "Powered by Machine Learning",
    "Trang  giới thiệu về LSExxam"
  ),
  createData(
    "https://www.thoughtco.com/thmb/Rseh_u4w6D2t32PAjJHDMloerqs=/2120x1192/smart/filters:no_upscale()/GettyImages-962348664-5c50969646e0fb0001a8ea3a.jpg",
    "Visual Learning Style Traits and Strategies",
    "Trang  giới thiệu về LSExxam"
  ),
  createData(
    "https://elearningindustry.com/wp-content/uploads/2020/05/blended-learning-learn-6-benefits.jpg",
    "Giới thiệu LSExam",
    "Trang  giới thiệu về LSExxam"
  ),
  createData(
    "https://elearningindustry.com/wp-content/uploads/2020/05/blended-learning-learn-6-benefits.jpg",
    "Giới thiệu LSExam",
    "Trang  giới thiệu về LSExxam"
  ),
  createData(
    "https://elearningindustry.com/wp-content/uploads/2020/05/blended-learning-learn-6-benefits.jpg",
    "Giới thiệu LSExam",
    "Trang  giới thiệu về LSExxam"
  ),
];

export default function ActionAreaCard() {
    return (
      <>
        <Grid container>
        {posts.map((post) => (
          <Grid item xs={12} sm={4} xl={4}>
            <Item sx={{backgroundColor: '#161d31'}}>
              <Card sx={{ maxWidth: 345}}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={post.imgLink}
                    alt=""
                  />
                  <CardContent sx={{backgroundColor: '#161d31', color: 'white'}}>
                    <Typography gutterBottom variant="h5" component="div">
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {post.content}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Item>
          
          </Grid>
          ))}
        </Grid>

        {/* <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          
        </Stack> */}
      </>
    );
}
