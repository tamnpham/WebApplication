// material
import {
  Container,
  Box,
  Tab,
  Grid,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Input,
  Stack,
  TextareaAutosize,
} from "@mui/material";
// import {TabContext , TabList , TabPanel } from '@mui/lab';
// import TabContext from "@mui/lab/TabContext";
// import TabList from "@mui/lab/TabList";
// import TabPanel from "@mui/lab/TabPanel";
import { LoadingButton, TabPanel, TabList, TabContext } from "@mui/lab";
import { makeStyles } from "@material-ui/core";

//formik
import {
  useFormik,
  Form,
  FormikProvider,
  FieldArray,
  getIn,
  Field,
  Formik,
} from "formik";
// components
import Page from "../components/Page";
//React
import { useState, useEffect } from "react";

// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------

export default function Admin() {
  const classes = useStyles();

  const [valueTab, setValueTab] = useState("1");

  const [categories, setCategories] = useState([]);

  const defaultValues = {
    categoryId: "",
    title: "",
    content: "",
    answers: [""],
    trueAnswer: 0,
    image: "",
  };
  const [questionData, setQuestionData] = useState(defaultValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({
      ...questionData,
      [name]: value,
    });
  };

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(value);
  // };

  const onSubmit = (values, submitProps) => {
    console.log("Form data", values);
    console.log("submitProps", submitProps);
    submitProps.setSubmitting(false);
    submitProps.resetForm();
  };

  const [formValues, setFormValues] = useState(null);

  useEffect(() => {
    const apiUrl = `http://34.72.189.169:8080/api/category`;
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
        console.log(response.length);
        setCategories(response);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      category: "",
      title: "",
      content: "",
      answers: [],
      trueAnswer: 0,
      image: "",
    },
    onSubmit: (values, actions) => {
      const auth = localStorage.getItem("token");
      actions.setSubmitting(true);
      console.log(values.category);
      console.log(values.title);
      console.log(values.content);
      console.log(values.image);
      let data = new FormData();
      data.append("image", values.image);
      console.log(data);
      // console.log(values.answers);
      // console.log(values.trueAnswer);

      // const requestOption = {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //     Authorization: "Bearer " + auth,
      //   },
      //   body: JSON.stringify({
      //     category: values.category,
      //     title: values.title,
      //     content: values.content,
      //     answers: values.answers,
      //     trueAnswer: values.trueAnswer,
      //     image: values.image,
      //   }),
      // };

      // let url = "http://34.72.189.169:8080/api/question/";

      // fetch(url, requestOption)
      //   // HTTP response
      //   .then((response) => {
      //     // if 200 OK
      //     if (response.ok) {
      //       //success
      //       console.log(response);
      //       return response.json();
      //     } else {
      //       //fail
      //       return response.json().then((data) => {
      //         //show error
      //         let errorMessage = "Register failed!";
      //         throw new Error(errorMessage);
      //       });
      //     }
      //   })
      //   .then((data) => {
      //     console.log(data.status);
      //     // eslint-disable-next-line eqeqeq
      //     if (data.status == "Success") {
      //       alert("Create question Success!");
      //     } else {
      //       let errorMessage = "Something went wrong! Try again!";
      //       throw new Error(errorMessage);
      //     }
      //   })
      //   .catch((err) => {
      //     alert(err.message);
      //   });
      actions.setSubmitting(false);
    },
  });

  const {
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    setFieldValue,
    values,
    handleChange,
    handleBlur,
  } = formik;

  return (
    <Page title="Admin Page">
      <Container>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={valueTab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChangeTab}
                aria-label="lab API tabs example"
                centered
              >
                <Tab label="Edit question" value="1" />
                <Tab label="Add question" value="2" />
                <Tab label="Delete question" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
            </TabPanel>
            <TabPanel value="2">
              <Formik
                initialValues={{
                  category: "",
                  title: "",
                  content: "",
                  answers: [],
                  trueAnswer: 0,
                  image: "",
                }}
                onSubmit={(values) => {
                  const auth = localStorage.getItem("token");
                  let data = new FormData();
                  data.append("category", values.category);
                  data.append("title", values.title);
                  data.append("content", values.content);
                  data.append("answers", values.answers);
                  data.append("trueAnswer", values.trueAnswer);
                  data.append("image", values.image);
                  console.log(data.get("answers"));
                  console.log(values.answers)
                  console.log(data.get("image"));
                  const requestOption = {
                    method: "POST",
                    headers: {
                      // Accept: "*/*",
                      // "Content-Type": "multipart/form-data",
                      Authorization: "Bearer " + auth,
                    },
                    body: data
                  };

                  let url = "http://34.72.189.169:8080/api/question/";

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
                          let errorMessage = "Create Question failed!";
                          throw new Error(errorMessage);
                        });
                      }
                    })
                    .then((data) => {
                      console.log(data);
                    })
                    .catch((err) => {
                      alert(err.message);
                    });
                  // setTimeout(() => {
                  //   alert(JSON.stringify(values, null, 2));
                  // }, 500)
                }}
                render={({ values, getFieldProps, setFieldValue }) => (
                  <Form>
                    <Stack spacing={2}>
                      <Select
                        name="categoryId"
                        value={questionData.categoryId}
                        onChange={handleInputChange}
                        {...getFieldProps("category")}
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
                      <TextField
                        label="Title"
                        variant="outlined"
                        {...getFieldProps("title")}
                        inputProps={{ className: classes.inputSelect }}
                      />
                      <TextField
                        label="Question"
                        variant="outlined"
                        {...getFieldProps("content")}
                        multiline
                        inputProps={{ className: classes.inputSelect }}
                      />
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <input
                            accept="image/*"
                            className={classes.input}
                            onChange={(e) => {
                              setFieldValue("image", e.target.files[0]);
                            }}
                            id="raised-button-file"
                            multiple
                            type="file"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            label="True Answer (0->A,1->B,2->C,3->D,...)"
                            variant="outlined"
                            {...getFieldProps("trueAnswer")}
                            inputProps={{ className: classes.inputSelect }}
                          />
                        </Grid>
                      </Grid>
                      <FieldArray
                        name="answers"
                        render={(arrayHelpers) => (
                          <div>
                            {values.answers && values.answers.length > 0 ? (
                              values.answers.map((answer, index) => (
                                <div key={index}>
                                  <Field
                                    variant="outlined"
                                    name={`answers.${index}`}
                                    inputProps={{
                                      className: classes.inputSelect,
                                    }}
                                  />
                                  <Button
                                    type="button"
                                    variant="contained"
                                    sx={{ m: 1 }}
                                    onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                  >
                                    -
                                  </Button>
                                  <Button
                                    type="button"
                                    variant="contained"
                                    sx={{ m: 1 }}
                                    onClick={() =>
                                      arrayHelpers.insert(index, "")
                                    } // insert an empty string at a position
                                  >
                                    +
                                  </Button>
                                </div>
                              ))
                            ) : (
                              <Button
                                type="button"
                                variant="contained"
                                sx={{ m: 1 }}
                                onClick={() => arrayHelpers.push("")}
                              >
                                {/* show this when user has removed all friends from the list */}
                                Add a friend
                              </Button>
                            )}
                            <div>
                              <Button
                                variant="contained"
                                sx={{ m: 1 }}
                                type="submit"
                              >
                                Submit
                              </Button>
                            </div>
                          </div>
                        )}
                      />
                    </Stack>
                  </Form>
                )}
              />
            </TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
          </TabContext>
        </Box>
      </Container>
    </Page>
  );
}
