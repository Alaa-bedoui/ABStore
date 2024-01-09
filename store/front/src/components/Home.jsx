import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Grid } from '@mui/material';
import {useParams} from 'react-router-dom'
import List from './List.jsx';
import Favourites from './Favourites.jsx';
function Home() {
  const {iduser} = useParams();
  localStorage.setItem('iduser', iduser)
console.log("params",iduser);
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
        <List iduser={iduser}/>   
       </Paper>
       <Favourites iduser={iduser} />  

      <Grid> 
      </Grid>
    </Container>
  );
}

export default Home;
