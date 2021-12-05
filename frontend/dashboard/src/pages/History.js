// material
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import CenteredTabs from '../components/history/CenterTab';


// ----------------------------------------------------------------------

export default function Scoreboard() {

  return (
    <Page title="LSExam | Scoreboard">
      <Container>

        <Container>
          <CenteredTabs />
          
        </Container>
        
      </Container>
    </Page>
  );
}
