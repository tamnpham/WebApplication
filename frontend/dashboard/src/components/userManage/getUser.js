// material
import {
  Container,
  Box,
  Tab,
  Grid,
  MenuItem,
  Button,
  Select,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  LinearProgress,
  Typography,
} from "@mui/material";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import { makeStyles } from "@material-ui/core";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { AuthContext } from "../../store/auth-context";
import { LicenseInfo } from "@mui/x-data-grid-pro";

// components
import Page from "../Page";
//React
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import dotenv from "dotenv";
dotenv.config();
const API_SERVER = process.env.REACT_APP_LSEXAM_API_SERVER;

// --------------------------------------------

// LicenseInfo.setLicenseKey(
//     'x0jTPl0USVkVZV0SsMjM1kDNyADM5cjM2ETPZJVSQhVRsIDN0YTM6IVREJ1T0b9586ef25c9853decfa7709eee27a1e',
//   );

const useStyles = makeStyles({
  typography: {
    position: "absolute",
    left: "50%",
    transform: "(-50%,50%)",
  },
  center: {
    textAlign: "center",
  },
  inputSelect: {
    color: "white",
  },
});

// const rows: GridRowsProp = [
//   { id: 1, col1: "Hello", col2: "World" },
//   { id: 2, col1: "DataGridPro", col2: "is Awesome" },
//   { id: 3, col1: "MUI", col2: "is Amazing" },
// ];

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First Name", width: 130 },
  { field: "lastName", headerName: "Last Name", width: 130 },
  { field: "email", headerName: "Email", width: 220 },
  { field: "school", headerName: "School", width: 150 },
  { field: "major", headerName: "Major", width: 150 },
  { field: "phone", headerName: "Phone", width: 120 },
  { field: "role", headerName: "Role", width: 100 },
  { field: "lastLogin", headerName: "Last Login", width: 190 },
  { field: "created", headerName: "Created", width: 190 },
  { field: "modified", headerName: "Modified", width: 190 },
];

export default function GetUsers() {
  const classes = useStyles();

  const authCtx = useContext(AuthContext);

  const [usersInfo, setUsersInfo] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const apiUrl = `${API_SERVER}/api/admin/`;
      const auth = authCtx.token;
      const requestOption = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
      };
      fetch(apiUrl, requestOption)
        .then((res) => res.json())
        .then((users) => {
          try {
            let reformatUsers = users.map((user) => {
              var created = new Date(user.created);
              created = created.toLocaleString("en-US");
              var lastLogin = new Date(user.last_login);
              lastLogin = lastLogin.toLocaleString("en-US");
              var modified = new Date(user.modified);
              modified = modified.toLocaleString("en-US");
              return {
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                school: user.school,
                major: user.major,
                phone: user.phone,
                isAdmin: user.is_admin,
                role: user.role,
                lastLogin: lastLogin,
                created: created,
                modified: modified,
              };
            });
            setUsersInfo(reformatUsers);
            console.log(reformatUsers);
          } catch (err) {
            alert(err.message);
            navigate("/error");
          }
        })
        .catch((err) => {
          alert(err.message);
          navigate("/error");
        });
    } catch (err) {
      console.log(err);
      //   navigate("/login");
    }
  }, []);

  if (usersInfo.length > 0) {
    return (
      <Container>
        <div style={{ height: 500, width: "100%", backgroundColor: "white" }}>
          <DataGrid rows={usersInfo} columns={columns} />
        </div>
      </Container>
    );
  } else {
    return (
      <>
        <Page title="Dashboard | LSExam">
          <Container maxWidth="xl">
            <Box sx={{ p: "25%" }}>
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
