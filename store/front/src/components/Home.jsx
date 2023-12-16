import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Grid } from '@mui/material';

function Home() {
  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }} >
      <Paper elevation={3} style={{ padding: '20px' }} >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" gutterBottom>
              Welcome to ABStore!
            </Typography>
          </Grid>
          <Grid item xs={12}>
          </Grid>
        </Grid>
      </Paper>
      <Grid> 
      </Grid>
    </Container>
  );
}

export default Home;
