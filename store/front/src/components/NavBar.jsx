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
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PrivateRoute from './PrivateRoutes.jsx';
import Home from './Home.jsx';
import List from './List.jsx';
import ItemDetail from './ItemDetail.jsx';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import Favourites from './Favourites.jsx';

const Navbar = () => {
const iduser=  localStorage.getItem('iduser')
  const [isAuthenticated, setIsAuthenticated] = useState(false);
const navigate = useNavigate();
  const signOut = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');

  };

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
      <CssBaseline />
        <AppBar position="fixed">
          {isAuthenticated&&<Container>
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }} component={Link} to="/home">
                ABStore
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button component={Link} to={`/home/bag/${iduser}`} color="inherit" sx={{ marginRight: 2 }}>
                  Home
                </Button>
                  <>
                    <Button component={Link} to="/AllItems/*" color="inherit">
                      All Items
                    </Button>
                    <Button onClick={signOut} color="inherit">
                      Log Out
                    </Button>
                    <Button component={Link} to={`/home/bag/${iduser}`} color="inherit">
                    <ShoppingBagOutlinedIcon  />   
                    </Button>
                                 </>
              </Box>
            </Toolbar>
          </Container>}
        </AppBar>

        <Container sx={{ marginTop: '20px', padding: '20px' }}>
          <Routes>
            <Route
              path="/"
              element={<SignIn isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route path="/SignUp" element={<SignUp />} />
            <Route
              path="/home/:iduser"
              element={
                <PrivateRoute
                  element={Home}
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              }
            />
            <Route
              path="/AllItems/*"
              element={
                <PrivateRoute
                element={List}
                iduser={iduser}
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              }
            />
            <Route
              path="/itemDetail"
              element={
                <PrivateRoute
                  element={ItemDetail}
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              }
            />
             <Route
              path="/home/bag/:iduser"
              element={
                <PrivateRoute
                  element={Favourites}
                  iduser={iduser}
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              }
            />
          </Routes>
        </Container>
    </ThemeProvider>
  );
};

export default Navbar;
