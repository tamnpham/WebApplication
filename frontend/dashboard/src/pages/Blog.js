import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import ActionAreaCard from '../components/blog/PostCard'
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../components/_dashboard/blog';
//
import POSTS from '../_mocks_/blog';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function Blog() {
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
