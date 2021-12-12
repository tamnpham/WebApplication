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
  Typography,
  FormControl,
  Paper,
  InputLabel,
  Autocomplete,
} from "@mui/material";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import { makeStyles } from "@material-ui/core";

//formik
import { Form, FieldArray, Field, Formik } from "formik";
// components
import Page from "../Page";
//React
import { useState, useEffect } from "react";
import dotenv from "dotenv";
dotenv.config();
const API_SERVER = process.env.REACT_APP_LSEXAM_API_SERVER;
// --------------------------------------------

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
  input: {
    color: "white",
  }
});

export default function DeleteCategory() {
  const classes = useStyles();

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});
  const [categoryId, setCategoryId] = useState(null);

  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState("");
  const [ok, setOk] = useState(false);

  const handleInputChange = (value) => {
    console.log(value);
    const apiUrl = `${API_SERVER}/api/category/${value}`;
    console.log(apiUrl);
    const auth = localStorage.getItem("token");
    const requestOption = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth,
      },
    };
    try {
      fetch(apiUrl, requestOption)
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          setCategory(response);
          setOk(true);
        });
    } catch (err) {
      console.log(err);
    }
  };

  function refreshPage() {
    window.location.reload(false);
  }

  useEffect(() => {
    try{
      const interval = setInterval(() => {
        const apiUrl = `${API_SERVER}/api/category`;
        const auth = localStorage.getItem("token");
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
          .then((response) => {
            const categories = response.map((category) => {
              return {label: category.name, id: category.id};
            });
            setOptions(categories);
            setCategories(response);
          });
        }, 1000);
        return () => clearInterval(interval);
    }
    catch(err){
      console.log(err);
      refreshPage();
    }
  }, []);

  useEffect(() => {
    try {
      const apiUrl = `${API_SERVER}/api/category/${categoryId}/`;
      const auth = localStorage.getItem("token");
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
        .then((response) => {
          setCategory(response);
        });
    } catch (err) {
      console.log(err);
    }
  }, [categoryId]);

  if (categories.length > 0) {
    return (
      <Container>
        <Stack sx={{ mb: "30px", width: "100%" }}>
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              if (newValue !== null) {
                console.log(newValue.id);
                setValue(newValue.id);
                handleInputChange(newValue.id);
              }
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={options}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Question"
                inputProps={{
                  ...params.inputProps,
                  className: classes.input,
                }}
              />
            )}
          />
        </Stack>

        {category.id && ok === true && (
          <Formik
            enableReinitialize
            initialValues={{
              id: category.id,
              name: category.name,
            }}
            onSubmit={(values) => {
              const auth = localStorage.getItem("token");

              const requestOption = {
                method: "DELETE",
                headers: {
                  Authorization: "Bearer " + auth,
                },
              };

              let url = `${API_SERVER}/api/category/${category.id}`;

              fetch(url, requestOption)
                // HTTP response
                .then((response) => {
                  //  OK
                  if (response.ok) {
                    //success
                    console.log(response);
                    return;
                  } else {
                    //fail
                    return response.json().then((data) => {
                      //show error
                      let errorMessage = "Delete Category failed!";
                      throw new Error(errorMessage);
                    });
                  }
                })
                .then(() => {
                  alert("Delete Category successfully");
                  // refreshPage();
                  setOk(false);
                })
                .catch((err) => {
                  console.log(err);
                  alert(err.message);
                });
              // console.log(values);
            }}
            render={({ values, getFieldProps, setFieldValue }) => (
              <Form>
                <Stack spacing={2}>
                  <FormControl
                    variant="outlined"
                    sx={{ m: 1, width: "100%", pb: "5%" }}
                  >
                    {/* <InputLabel>Category Name</InputLabel> */}
                    <TextField
                      disabled
                      label="Category Name"
                      variant="outlined"
                      defaultValue={category.name}
                      {...getFieldProps("name")}
                      inputProps={{ className: classes.inputSelect }}
                    />
                  </FormControl>
                  <Button type="submit" variant="contained" sx={{ m: 1 }}>
                    Submit
                  </Button>
                </Stack>
              </Form>
            )}
          />
        )}
      </Container>
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
              Loading...
            </Typography>
          </div>
        </Page>
      </>
    );
  }
}
