import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return <Box component="img" src="/favicon/LSExam-logo.png" sx={{ width: 170, height: 50, paddingLeft: 1, ...sx }} />;
}
