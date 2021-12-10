// material
import { Container, Typography, Grid, Paper, Box, Button, IconButton, Tooltip, Menu, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import ReactMarkdown from "react-markdown";
import LinearProgress from "@mui/material/LinearProgress";
// components
import Page from "../components/Page";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
// import Typography from '@mui/material/Typography';
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

import Comments from "./Comments"
import AccountPopover from "../layouts/dashboard/AccountPopover";
import DashboardNavbar from "../layouts/dashboard/DashboardNavbar";
import DashboardSidebar from '../layouts/dashboard/DashboardSidebar';
import dotenv from "dotenv";
dotenv.config();
const API_SERVER=process.env.REACT_APP_LSEXAM_API_SERVER; 
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
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// const rootStyle = styled(Body)
// ----------------------------------------------------------------------

export default function Post(props) {
  const { id } = useParams();
  const [postState, setPostState] = useState(null);

  useEffect(() => {
    //fetch data from server
    const apiUrl = `${API_SERVER}/api/blog/` + id;
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
  }, []);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  if (postState !== null) {
    return (
      <div style={{ height: "100%", backgroundColor: "#161d31" }}>
        <React.Fragment>
          <CssBaseline />
          <ElevationScroll {...props}>
            <AppBar>
              <Toolbar
                sx={{
                  backgroundImage: `url("https://archive-media-0.nyafuu.org/wg/image/1510/51/1510512877961.gif")`,
                }}
              >
                <img
                  src="/favicon/LSExam-logo.png"
                  alt="LSE exam"
                  style={{ width: "68px", height: "64px", marginLeft: 0 }}
                />
                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Button
                        variant="text"
                        color="primary"
                        component={Link}
                        to="/dashboard/app"
                        sx={{ mr: "1%" }}
                      >
                        Home
                      </Button>
                      <Button
                        variant="text"
                        color="primary"
                        component={Link}
                        to="/dashboard/blog"
                        sx={{ mr: "1%" }}
                      >
                        Blogs
                      </Button>
                    </MenuItem>
                  </Menu>
                </Box>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                >
                  LSExam
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  <Button
                    variant="text"
                    color="primary"
                    component={Link}
                    to="/dashboard/app"
                    sx={{ mr: "1%", my: 2, color: "white", display: "block" }}
                  >
                    Home
                  </Button>
                  <Button
                    variant="text"
                    color="primary"
                    component={Link}
                    to="/dashboard/blog"
                    sx={{ mr: "1%", my: 2, color: "white", display: "block" }}
                  >
                    Blogs
                  </Button>
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <AccountPopover />
                  </Tooltip>
                </Box>
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
                // height: "200%",
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
                      By {postState.author.first_name}{" "}
                      {postState.author.last_name} , created {postState.created}
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

                  <Grid item xs={12} sm={12} md={12} xl={12}>
                    <Comments postId={postState.id} />
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
              width: "80%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Typography variant="h1" color="white" textAlign="center">
              {" "}
              Loading...{" "}
            </Typography>
            <LinearProgress color="success" />
          </div>
        </Page>


      </>
    );
  }
}
