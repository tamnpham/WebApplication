// material
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import CenteredTabs from '../components/scoreboard/CenterTab';


// ----------------------------------------------------------------------

export default function Scoreboard() {

  return (
    <Page title="LSExam | Scoreboard">
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
