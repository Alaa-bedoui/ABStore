import React, { useState, useEffect } from "react";
import { Button, Snackbar, CircularProgress, Box, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function List({ iduser }) {
  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);
  const [reload, setReload] = useState(true);
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const addFav = (iditem) => {
    axios.post(`http://localhost:8080/abStore/${iduser}/${iditem}`)
      .then((res) => {
        console.log(res);
        setSnackbarMessage('Item added to favorites');
        setOpen(!open);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  useEffect(() => {
    axios
      .get('http://localhost:8080/abStore/getAll')
      .then((result) => {
        setAllData(result.data);
      })
      .catch((error) => {
        alert('Axios getAll ERROR ', error);
      });
  }, [reload]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const remove = (id) => {
    axios
      .delete(`http://localhost:8080/abStore/delete/${id}`)
      .then(() => {
        setReload(!reload);
        setSnackbarMessage('Item deleted successfully');
        setOpen(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleShowDetails = (item) => {
    navigate('/itemDetail', { state: { item: item } });
  };

  if (allData.length === 0) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
      <div className="item-container">
        {allData.map((item) => (
          <div className="item" key={item.iditem}>
            <h3>{item?.name}</h3>
            <p id="par">Price: {item?.price} DT</p>
            <div>
              <img src={item?.image} alt={item?.name} />
            </div>
            <div className="buttons">
              <Button
                variant="contained"
                onClick={() => handleShowDetails(item)}
              >
                Details
              </Button>
              <Button
                variant="contained"
                onClick={() => remove(item?.iditem)}
              >
                Delete
              </Button>
              <Button variant="contained" onClick={() => addFav(item.iditem)}>
                <FavoriteBorderIcon />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
