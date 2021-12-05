// material
import { Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import CenteredTabs from '../components/scoreboard/CenterTab';


// ----------------------------------------------------------------------

export default function Scoreboard() {

  return (
    <Page title="LSExam | Scoreboard">
      <Container>
        <Typography variant="h4" gutterBottom>
          Scoreboard
        </Typography>
        <Container>
          <CenteredTabs />
        </Container>
      </Container>
    </Page>
  );
}
