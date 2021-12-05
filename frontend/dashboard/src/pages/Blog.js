// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import ActionAreaCard from '../components/blog/PostCard'
//

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function History() {
  return (
    <Page title="Dashboard: Blog | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Blog
          </Typography>
        </Stack>
      
      <ActionAreaCard />
      </Container>
    </Page>
  );
}
