import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Alert from "@mui/material/Alert";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function List({iduser}) {
  console.log(iduser);
  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);
  const [reload, setReload] = useState(true);
const addFav=(iditem)=>{
  axios.post(`https://stoore-ten.vercel.app/${iduser}/${iditem}`).then((res)=>{
    console.log(res)
  })
  .catch((err)=>{
    console.error(err.message);
  })
}
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
        handleClick();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleShowDetails = (item) => {
    navigate('/itemDetail', { state:  {item: item}});
  }

  if (allData.length === 0) {
  
       <Box sx={{ display: 'flex' }}>
         <CircularProgress />
        
       </Box>
       
    
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
        <Button variant="contained" onClick={()=>{
          addFav(item.iditem)
        }} >
          <FavoriteBorderIcon />
        </Button>
        </div>  
    </div>
  ))}
</div>

      </div>
    </div>
  );
}

export default List;
