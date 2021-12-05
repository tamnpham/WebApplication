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
} from "@mui/material";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import { makeStyles } from "@material-ui/core";

//formik
import { Form, FieldArray, Field, Formik } from "formik";
// components
import Page from "../Page";
//React
import { useState, useEffect } from "react";

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
});

export default function EditCategory() {
  const classes = useStyles();

  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [category, setCategory] = useState({});
  const [categoryId, setCategoryId] = useState(null);

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setCategoryId(e.target.value);
  };

  useEffect(() => {
    try {
      const apiUrl = `http://34.72.189.169:8080/api/category/${categoryId}/`;
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
    const apiUrl = `http://34.72.189.169:8080/api/category/`;
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
        console.log(response)
        setCategories(response);
      });
  }, []);

  useEffect(() => {
    try {
      const apiUrl = `http://34.72.189.169:8080/api/category/${categoryId}/`;
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
          console.log(response)
          setCategory(response);
        });
    } catch (err) {
      console.log(err);
    }
  }, [categoryId]);

  console.log(categories)

  if (categories.length > 0) {
    return (
      <Container>
        <Stack>
          <FormControl
            variant="standard"
            sx={{ m: 1, width: "100%", pb: "5%" }}
          >
            <InputLabel>Category</InputLabel>
            <Select
              name="categories"
              onChange={handleInputChange}
              inputProps={{ className: classes.inputSelect }}
            >
              {categories &&
                categories.length &&
                categories.map((category) => (
                  <MenuItem value={category.id} key={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Stack>

        {category.id && (
          <Formik
            enableReinitialize
            initialValues={{
              id: category.id,
              name: category.name,
            }}
            onSubmit={(values) => {
              const auth = localStorage.getItem("token");
              let data = new FormData();
              data.append("name", values.name);
              data.append("id", category.id);

              const requestOption = {
                method: "POST",
                headers: {
                  Authorization: "Bearer " + auth,
                },
                body: data,
              };

              let url = "http://34.72.189.169:8080/api/category/update/";

              fetch(url, requestOption)
                // HTTP response
                .then((response) => {
                  //  OK
                  if (response.ok) {
                    //success
                    console.log(response);
                    return response.json();
                  } else {
                    //fail
                    return response.json().then((data) => {
                      //show error
                      let errorMessage = "Update Category failed!";
                      throw new Error(errorMessage);
                    });
                  }
                })
                .then((data) => {
                  console.log(data);
                  alert("Update Category successfully");
                })
                .catch((err) => {
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
