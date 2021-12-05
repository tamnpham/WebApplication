import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

// const useStyles = makeStyles({
//   input: {
//     color: "white"
//   }
// });

export default function Logo({ sx }) {
  return <Box component="img" src="/favicon/LSExam-logo.png" sx={{ width: 130, height: 130, marginLeft: 0, ...sx }} />;
}
