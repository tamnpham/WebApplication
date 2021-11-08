import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ScoreTable from './ScoreTable';
export default function CenteredTab() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1'}}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
            <Tab label="Thế giới" value="1" />
            <Tab label="Chỉ mình bạn" value="2" />
            <Tab label="" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{height: '700px'}}>
            <ScoreTable />
        </TabPanel>

        <TabPanel value="2">
            <ScoreTable />
        </TabPanel>
      </TabContext>
    </Box>
  );
}