import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Routes, Route, useNavigate } from 'react-router-dom';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 const navigate=useNavigate()
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

  const handleLogout = () => {
    // Perform logout actions here
    setIsLoggedIn(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ marginTop: '20px', padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} /> 
          <Route path="/home" element={<Home/>} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </Container>
      <CssBaseline />
      <AppBar position="fixed">
        <Container>
          <Toolbar>
            {!isLoggedIn? (<Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }} >
              Admin Side
            </Typography>):(<Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }} >
              Welcome Admin 
            </Typography>)}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {isLoggedIn ? (
                <Button color="inherit" onClick={handleLogout} sx={{ marginRight: 2 }}
                 onClickCapture={()=>{localStorage.clear(),navigate("/auth")}}
                >
                  Logout
                </Button>
              ) : (
                <Button component={Link} to="/auth" color="inherit" sx={{ marginRight: 2 }}>
                  Login
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default App;
