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
  LinearProgress,
  TextField,
  FormControl,
  Input,
  InputLabel,
} from "@mui/material";
// components
import Page from "../components/Page";
//
import USERLIST from "../_mocks_/user";

// -----------------------------Variable and State--------------------------


// -----------------------------CSS-----------------------------------------
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: "center",
  color: "#145A32",
  background: "#ABEBC6",
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "center",
    paddingLeft: '10%',
    paddingRight: '10%',
    // width: '70%',
  }
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
          <Grid item xs={2}>
            <AvatarImage
              alt="Remy Sharp"
              src="https://i.pinimg.com/originals/e6/dd/c6/e6ddc6f9aa34a62bb90caf59e91cc7c8.png"
              sx={{ width: 150, height: 150 }}
            />
          </Grid>
          <Grid item xs={4}>
            <Item>
              <Typography variant="h4">Phạm Ngọc Tâm</Typography>

              <Typography variant="body2">
                <strong>tuổi:</strong> 21 tuổi
              </Typography>

              <Typography variant="body2">
                <strong>Địa chỉ:</strong>: Hoà Long, TP.Bà Rịa, Tỉnh Bà Rịa -
                Vũng Tàu
              </Typography>

              <Typography variant="body2">
                <strong>Email:</strong> phamngoctam2405it@gmail.com
              </Typography>

              <Typography variant="body2">
                <strong>Điện thoại:</strong> 0795541213
              </Typography>

              <Typography variant="body2">
                <strong>Nghề nghiệp:</strong> sinh viên
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
              <LinearProgress color="secondary" />
              <LinearProgress color="success" />
              <LinearProgress color="inherit" />
              <LinearProgress color="inherit" />
              <LinearProgress color="inherit" />
              <LinearProgress color="secondary" />
              <LinearProgress color="success" />
              <LinearProgress color="secondary" />
              <LinearProgress color="success" />
            </Stack>
          </Grid>
        </Grid>

        <Box textAlign="center">
          <Button onClick={() => setEditMode(true)}
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
        <Box className={classes.formEdit}>
        <FormControl>

          <label>Tên</label>
          <TextField id="outlined-basic" variant="outlined"/>
        
          <label>Địa chỉ</label>
          <TextField id="outlined-basic" variant="outlined" />

          <label>Số điện thoại</label>
          <TextField id="outlined-basic" variant="outlined" />

          <label>Email</label>
          <TextField id="outlined-basic" variant="outlined" />

        </FormControl>
        </Box>

        <Box textAlign="center">
          <Button onClick={() => setEditMode(false)}
            variant="contained"
            color="success"
            className={classes.buttonEdit}
          >
            Lưu
          </Button>

        </Box>
      </Container>
    )}

    </Page>
  );
}
