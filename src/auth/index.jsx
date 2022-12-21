import React from 'react';

import { Grid, TextField, Typography, Button } from '@mui/material';

function Auth({ handleUserChange, handleUserSubmit, user }) {
  return (
    <>
      <Typography p={2} variant="h6" gutterBottom>
        Please enter your name:
      </Typography>

      <Grid
        container
        spacing={4}
        alignItems="start"
        flexDirection={'column'}
        justifyContent={'center'}
      >
        <Grid mt={2} item>
          <TextField
            onChange={handleUserChange}
            value={user}
            label="Name"
            variant="outlined"
            required
          />
        </Grid>
        <Grid item mb={6}>
          <Button variant="contained" onClick={handleUserSubmit}>
            Send
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default Auth;
