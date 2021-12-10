import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function ScoreTable(props) {

  const data = props.data;
  const length = props.length;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{ width: "1%", textAlign: "center" }}>
              STT
            </StyledTableCell>
            <StyledTableCell style={{ width: "1%", textAlign: "center" }}>
              Username
            </StyledTableCell>
            <StyledTableCell style={{ width: "1%", textAlign: "center" }}>
              Duration
            </StyledTableCell>
            <StyledTableCell style={{ width: "1%", textAlign: "center" }}>
              Questions
            </StyledTableCell>
            <StyledTableCell style={{ width: "1%", textAlign: "center" }}>
              Corrects
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
                <strong>{index+1}</strong>
              </StyledTableCell>

              <StyledTableCell
                component="th"
                scope="row"
                style={{ width: "1%", textAlign: "center" }}
              >
                <strong>{row.user.first_name} {row.user.last_name}</strong>
              </StyledTableCell>

              <StyledTableCell
                component="th"
                scope="row"
                style={{ width: "1%", textAlign: "center" }}
              >
                <strong>{row.duration}</strong>
              </StyledTableCell>

              <StyledTableCell
                component="th"
                scope="row"
                style={{ width: "1%", textAlign: "center" }}
              >
                <strong>{row.numberQuestions}</strong>
              </StyledTableCell>

              <StyledTableCell
                component="th"
                scope="row"
                style={{ width: "1%", textAlign: "center" }}
              >
                <strong>{row.numberCorrects}</strong>
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
  );
}