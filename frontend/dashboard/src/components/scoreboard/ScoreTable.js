import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

  const data = props.data

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{width: '1%', textAlign: 'center'}}>Hạng</StyledTableCell>
            <StyledTableCell style={{width: '1%', textAlign: 'center'}}>Username</StyledTableCell>
            <StyledTableCell style={{width: '1%', textAlign: 'center'}}>Score</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow>
              <StyledTableCell component="th" scope="row" style={{width: '1%', textAlign: 'center'}}>
                {row.rank}
              </StyledTableCell>

              <StyledTableCell component="th" scope="row" style={{width: '1%', textAlign: 'center'}}>
                {row.name}
              </StyledTableCell>
            
              <StyledTableCell component="th" scope="row" style={{width: '1%', textAlign: 'center'}}>
                {row.score}
              </StyledTableCell>
              

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}