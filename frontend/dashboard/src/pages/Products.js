import { useFormik } from 'formik';
import { useState } from 'react';
// material
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import CenteredTabs from '../components/scoreboard/CenterTab';


// ----------------------------------------------------------------------

export default function EcommerceShop() {

  return (
    <Page title="Dashboard: Products | Minimal-UI">
      <Container>
        {/* <Typography variant="h4" sx={{ mb: 5 }}>
          Bảng điểm
        </Typography> */}

        <Container>
          <CenteredTabs />
          
        </Container>
        
      </Container>
    </Page>
  );
}
