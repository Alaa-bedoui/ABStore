import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import "../App.css";
function Favourites({ iduser }) {
  const [open, setOpen] = useState(false);
  const [favs, setFavs] = useState([]);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  console.log("fav ", iduser);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/abStore/getFav/${iduser}`)
      .then((res) => {
        setFavs(res.data);
      })
      .catch((err) => {
        console.log(err);
        return (
          <div class="loader">
            <div data-glitch="Loading..." class="glitch">
              Loading...
            </div>
          </div>
        );
      });
  }, []);
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
    navigate("/itemDetail", { state: { item: item } });
  };

  return (
    <>
      <div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Item Deleted successfully
          </Alert>
        </Snackbar>
      </div>
      {favs.map((el) => {
        return (
          <div className="item" key={el.iditem}>
            <h3>{el?.name}</h3>
            <p id="par">Price: {el?.price}</p>
            <div>
              <img src={el?.image} alt={el?.name} />
            </div>
            <div className="buttons">
              <Button variant="contained" onClick={() => handleShowDetails(el)}>
                Details
              </Button>
              <Button variant="contained" onClick={() => remove(el?.idel)}>
                Delete
              </Button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Favourites;
