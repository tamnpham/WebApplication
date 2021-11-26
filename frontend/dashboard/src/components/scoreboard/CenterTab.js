import * as React from 'react';
import Box from '@mui/material/Box';
import ScoreTable from './ScoreTable';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { makeStyles } from "@material-ui/core/styles";
import { useFormik, Form, FormikProvider } from 'formik';
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles({
  input: {
    color: "white"
  }
});

function sleepFor(sleepDuration){
  var now = new Date().getTime();
  while(new Date().getTime() < now + sleepDuration){ /* Do nothing */ }
}

export default function CenteredTab() {
  const classes = useStyles();
  let rows;
  function createData(rank, name, score) {
    return { rank, name, score};
  }

  rows = [
      createData(1, "Phạm Ngọc Tâm", 4000),
      createData(2, "Huỳnh Minh Trí", 3000),
      createData(3, "Long", 3000),
      createData(4, "Long", 3000),
      createData(2, "Huỳnh Minh Trí", 3000),
      createData(2, "Huỳnh Minh Trí", 3000),
      createData(2, "Huỳnh Minh Trí", 3000),
      createData(2, "Huỳnh Minh Trí", 3000),
    ];

  const formik = useFormik({
    initialValues: {
      category: '',
    },
    onSubmit: (values, actions) => {
      
      actions.setSubmitting(true);
      // sleepFor(5000);
      console.log(values.category);
      //fetch data
      // eslint-disable-next-line no-const-assign
      actions.setSubmitting(false);
    }
  })

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <Box
          sx={{ borderBottom: 1, borderColor: "divider", textAlign: "center" }}
        >
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <FormControl sx={{ width: "50%", pb: "2%" }}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  label="Category"
                  placeholder="Choose category you want"
                  inputProps={{ className: classes.input }}
                  {...getFieldProps("category")}
                >
                  <MenuItem value={"ATMNC"}>An toàn mạng nâng cao</MenuItem>
                  <MenuItem value={"QLRR"}>Quản lí rủi ro</MenuItem>
                </Select>

                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  sx={{ mt: "4%" }}
                  loading={isSubmitting}
                >
                  View
                </Button>
              </FormControl>
            </Form>
          </FormikProvider>
        </Box>

        <ScoreTable data={rows}/>
      </Box>
    </>
  );
}