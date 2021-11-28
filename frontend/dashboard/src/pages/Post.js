// material
import { Container, Typography, Grid, Paper,Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import ReactMarkdown from 'react-markdown'
// components
import Page from '../components/Page';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
  } from "react-router-dom";
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

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
    "https://www.wpbeginner.com/wp-content/uploads/2016/11/blogimagetools.jpg",
    "trivonhan",
    "24/11/2021",
    "Giới thiệu LSExam",
    "Trang  giới thiệu về LSExxam"
  ),
  createData(
    "2",
    "https://ngocdenroi.com/wp-content/uploads/2021/01/cach-quang-ba-blog-tang-traffic-hieu-qua.jpg",
    "tamnpham",
    "27/11/2021",
    "Deep Learning with Javascript",
    "Trang  giới thiệu về LSExxam"
  ),
];

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


// ----------------------------------------------------------------------

export default function Post() {

    const { id } = useParams();
    const [postState, setPostState] = useState(posts[id]);

    useEffect(() => {
        const fetchPostData = async () => {
            //fetch data from server
            
            //
            console.log('fetch data')
            setPostState(posts[id])
        }
        fetchPostData()
    })

    return (
      <Page
        title="Post Page"
        sx={{
          p: "5%",
          backgroundColor: "#161d31",
          color: "white",
            // height: "100%",
        }}
      >
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} xl={12}>
              <Typography variant="h1">{postState.title}</Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={12} xl={12}>
              <Typography variant="body1">
                By {postState.by} - Posted {postState.time}
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
                <img alt="" src={postState.imgLink} width="50%"/>
              </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={12} xl={12}>
                <ReactMarkdown>*React-Markdown* is **Awesome**</ReactMarkdown>
            </Grid>
          </Grid>
        </Container>
      </Page>
    );
}
