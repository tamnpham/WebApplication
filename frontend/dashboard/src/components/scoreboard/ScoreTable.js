import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// material
import { Typography, Grid, Box } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#145A32',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor: '#ABEBC6',
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: "white",
  backgroundColor: "transparent",
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
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
    // backgroundColor: "#292f45",
  },
  badgeImage: {
    width: "100%",
    height: "100%",
  },
  badgeBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    color: "white"
  }
});


export default function ScoreTable(props) {
  const classes = useStyles();
  const data = props.data;
  const top1 = data[0];
  const top2 = data[1];
  const top3 = data[2];
  const length = props.length;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Item>
            {top2 && (
              <>
                <Box className={classes.badgeBox}>
                  <img
                    alt=""
                    src="\static\mock-images\badge\top2.png"
                    className={classes.badgeImage}
                  />
                </Box>

                <Typography
                  variant="h4"
                  sx={{
                    textAlign: "center",
                    color: "#fbb03b",
                    pt: "1%",
                  }}
                >
                  {top2.user.first_name} {top2.user.last_name}
                </Typography>
              </>
            )}
          </Item>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item>
            {top1 && (
              <>
                <Box className={classes.badgeBox}>
                  <img
                    alt=""
                    src="\static\mock-images\badge\top1.png"
                    className={classes.badgeImage}
                  />
                </Box>

                <Typography
                  variant="h4"
                  sx={{
                    textAlign: "center",
                    color: "#fbb03b",
                    pt: "1%",
                  }}
                >
                  {top1.user.first_name} {top1.user.last_name}
                </Typography>
              </>
            )}
          </Item>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item>
            {top3 && (
              <>
                <Box className={classes.badgeBox}>
                  <img
                    alt=""
                    src="\static\mock-images\badge\top3.png"
                    className={classes.badgeImage}
                  />
                </Box>

                <Typography
                  variant="h4"
                  sx={{
                    textAlign: "center",
                    color: "#fbb03b",
                    pt: "1%",
                  }}
                >
                  {top3.user.first_name} {top3.user.last_name}
                </Typography>
              </>
            )}
          </Item>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ width: "1%", textAlign: "center" }}>
                Rank
              </StyledTableCell>
              <StyledTableCell style={{ width: "1%", textAlign: "center" }}>
                Username
              </StyledTableCell>
              <StyledTableCell style={{ width: "1%", textAlign: "center" }}>
                Score
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <StyledTableRow>
                <StyledTableCell
                  component="th"
                  scope="row"
                  style={{ width: "1%", textAlign: "center" }}
                >
                  <strong>{index + 1}</strong>
                </StyledTableCell>

                <StyledTableCell
                  component="th"
                  scope="row"
                  style={{ width: "1%", textAlign: "center" }}
                >
                  <strong>
                    {row.user.first_name} {row.user.last_name}
                  </strong>
                </StyledTableCell>

                <StyledTableCell
                  component="th"
                  scope="row"
                  style={{ width: "1%", textAlign: "center" }}
                >
                  <strong>{row.score}</strong>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}