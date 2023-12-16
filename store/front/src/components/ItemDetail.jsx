import React from "react";
import { useLocation } from "react-router-dom";
function ItemDetail() {
  const location = useLocation();
  console.log("locatiton", location.state.item);
  const item = location.state.item;
  return (
    <div>
      <img src={item.image}></img>
      <p id="par">Category: {item?.category}</p>
      <p id="par">Quantity: {item?.quantity} DT</p>
    </div>
  );
}

export default ItemDetail;
