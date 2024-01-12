import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Routes, Route,useNavigate } from 'react-router-dom';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
  Box,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import SignUp from './components/SignUp.jsx';
const App = () => {
 

  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#2196f3',
      },
    },
    typography: {
      fontWeightBold: 700,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ marginTop: '20px', padding: '20px' }}>
          <Routes>
            <Route
              path="/"
              element={<Home/>}/>
            <Route
              path="/auth"
              element={<Login/>}/>
              <Route
              path="/signUp"
              element={<SignUp/>}/>
          </Routes>
        </Container>
      <CssBaseline />
        <AppBar position="fixed">
         <Container>
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }} component={Link} to="/">
                Admin Side
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button component={Link} to="/auth" color="inherit" sx={{ marginRight: 2 }}>
                  Login
                </Button>                                     
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        
    </ThemeProvider>
  );
};

export default App;
