import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Alert from "@mui/material/Alert";
function List() {
  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);
  const [reload, setReload] = useState(true);

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

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (reason) => {
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
        handleClick(); // Moved inside the .then block
      })
      .catch((error) => {
        console.log(error);
        // Alert should be outside the .catch block
      });
  };

  const handleShowDetails = (item) => {
    navigate('/itemDetail', { state:  {item: item}});
  }

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
            Item Deleted successfully
          </Alert>
        </Snackbar>
      </div>
      <div>
        {allData.map((item) => (
          <div className="item" key={item.iditem}>
            <h3>{item?.name}</h3>
            <p id="par">Price: {item?.price}</p>
            <div>
              <img src={item?.image} alt={item?.name} />
            </div>
            <Button
              variant="contained"
              style={{ display: "flex", marginLeft: "15px", width: "150px" }}
              onClick={() => handleShowDetails(item)}
            >
              Show Details
            </Button>
            <Button
              variant="contained"
              style={{ display: "flex", marginLeft: "15px" }}
              onClick={() => remove(item?.iditem)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
