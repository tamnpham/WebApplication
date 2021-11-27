/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

// material
import {
  Stack,
  Container,
  Typography,
  Grid,
  Paper,
  Avatar,
  Button,
  Box,
  TextField,
  FormControl,
} from "@mui/material";
// components
import Page from "../components/Page";

// -----------------------------Variable and State--------------------------


// -----------------------------CSS-----------------------------------------

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: "white",
  backgroundColor: "#292f45",
}));

const AvatarImage = styled(Avatar)(({ theme }) => ({
  textAlign: "center",
}));

const useStyles = makeStyles({
  buttonEdit: {
    marginTop: "50px",
    justifyContent: "center",
    backgroundColor: "#ABEBC6",
  },
  formEdit: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: "10%",
    paddingRight: "10%",
    // width: '70%',
  },
  badgeBlock: {
    backgroundColor: "#292f45",
  },
  badgeImage: {
    width: "20%",
    height: "20%",
  },
  badgeBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});


export default function User() {
  const classes = useStyles();
  const [isEditMode, setEditMode] = useState(false);

  return (
    <Page title="LSExam | Profile">
      {!isEditMode && (
        <Container>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h4" gutterBottom>
              Profile
            </Typography>
          </Stack>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AvatarImage
                  alt="Remy Sharp"
                  src="https://i.pinimg.com/originals/e6/dd/c6/e6ddc6f9aa34a62bb90caf59e91cc7c8.png"
                  sx={{ width: 150, height: 150 }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Item sx={{ height: "100%" }}>
                <Typography variant="h4">Phạm Ngọc Tâm</Typography>

                <Typography variant="body1">
                  <strong>Email:</strong> phamngoctam2405it@gmail.com
                </Typography>

                <Typography variant="body1">
                  <strong>Phone:</strong> 0795541213
                </Typography>

                <Typography variant="body1">
                  <strong>Major:</strong> sinh viên
                </Typography>

                <Typography variant="body1">
                  <strong>School:</strong> Trường Đại học Công Nghệ Thông Tin -
                  HCMC
                </Typography>
              </Item>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Item sx={{ height: "100%" }}>
                <Typography variant="h4" sx={{ textAlign: "center" }}>
                  Max Score
                </Typography>
                <Typography
                  variant="h1"
                  sx={{ textAlign: "center", color: "#43b581" }}
                >
                  300
                </Typography>
              </Item>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Item sx={{ height: "100%" }}>
                <Typography variant="h4" sx={{ textAlign: "center" }}>
                  Best Subject
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Item>
                      <Box className={classes.badgeBox}>
                        <img
                          src="https://www.clipartmax.com/png/middle/123-1232870_logo-subject-clip-art-subject-logo.png"
                          className={classes.badgeImage}
                        />
                      </Box>
                      <Typography
                        variant="h4"
                        sx={{ textAlign: "center", color: "#43b581", pt: '1%' }}
                      >
                        Math
                      </Typography>
                    </Item>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Item>
                      <Box className={classes.badgeBox}>
                        <img
                          src="https://freesvg.org/img/1529989446.png"
                          className={classes.badgeImage}
                        />
                      </Box>
                      <Typography
                        variant="h4"
                        sx={{ textAlign: "center", color: "#43b581", pt: '1%' }}
                      >
                        English
                      </Typography>
                    </Item>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Item>
                      <Box className={classes.badgeBox}>
                        <img
                          src="https://www.pinclipart.com/picdir/big/11-112061_content-png-pinterest-clip-art-svg-file-gold.png"
                          className={classes.badgeImage}
                        />
                      </Box>
                      <Typography
                        variant="h4"
                        sx={{ textAlign: "center", color: "#43b581", pt: '1%' }}
                      >
                        History
                      </Typography>
                    </Item>
                  </Grid>
                </Grid>
              </Item>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Item sx={{ height: "100%" }}>
                <Typography variant="h4" sx={{ textAlign: "center" }}>
                  Badges
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    pt: "1%",
                  }}
                >
                  <AvatarImage
                    alt="Remy Sharp"
                    src="https://i.pinimg.com/originals/e6/dd/c6/e6ddc6f9aa34a62bb90caf59e91cc7c8.png"
                    sx={{ width: 130, height: 130 }}
                  />
                </Box>
              </Item>
            </Grid>
          </Grid>

          <Box textAlign="center">
            <Button
              onClick={() => setEditMode(true)}
              variant="contained"
              color="success"
              className={classes.buttonEdit}
            >
              Edit profile
            </Button>
          </Box>
        </Container>
      )}

      {isEditMode && (
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3} sx={{ textAlign: "center" }}>
              <AvatarImage
                alt="Remy Sharp"
                src="https://i.pinimg.com/originals/e6/dd/c6/e6ddc6f9aa34a62bb90caf59e91cc7c8.png"
                sx={{
                  width: 150,
                  height: 150,
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "100px",
                  marginBottom: "50px",
                }}
              />
              <Button variant="contained" component="label">
                Upload File
                <input type="file" hidden />
              </Button>
            </Grid>
            <Grid item xs={12} sm={9} sx={{ textAlign: "center" }}>
              <Typography variant="h3" sx={{ pb: 5 }}>
                <strong>Update profile</strong>
              </Typography>
              <Box className={classes.formEdit}>
                <FormControl>
                  {/* <label>Firstname</label> */}
                  <TextField
                    id="outlined-basic"
                    label="Firstname"
                    variant="outlined"
                    sx={{ pb: 2 }}
                  />

                  {/* <label>Lastname</label> */}
                  <TextField
                    id="outlined-basic"
                    label="Lastname"
                    variant="outlined"
                    sx={{ pb: 2 }}
                  />

                  {/* <label>Address</label> */}
                  <TextField
                    id="outlined-basic"
                    label="Major"
                    variant="outlined"
                    sx={{ pb: 2 }}
                  />

                  {/* <label>Phone</label> */}
                  <TextField
                    id="outlined-basic"
                    label="School"
                    variant="outlined"
                    sx={{ pb: 2 }}
                  />

                  {/* <label>Email</label> */}
                  <TextField
                    id="outlined-basic"
                    label="Phone"
                    variant="outlined"
                    sx={{ pb: 2 }}
                  />
                </FormControl>
              </Box>

              <Box textAlign="center">
                <Button
                  onClick={() => setEditMode(false)}
                  variant="contained"
                  color="success"
                  className={classes.buttonEdit}
                >
                  Save
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      )}
    </Page>
  );
}
