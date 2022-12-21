import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

function Bar() {
  return (
    <Box mb={4} sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box mr={2}>
            <ChatIcon fontSize={'large'} />
          </Box>
          <Typography variant="h6">Chat App</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Bar;
