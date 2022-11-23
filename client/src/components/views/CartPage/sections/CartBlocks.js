import React from "react";
import "./CartBlock.css";
const CartBlocks = ({ products, deleteFromCart }) => {
  const renderImage = (images) => {
    if (images.length > 0) {
      let image = images[0];
      return `http://localhost:5000/${image}`;
    }
  };
  const renderItems = () =>
    products.map((item, index) => (
      <tr key={index}>
        <td>
          <img
            style={{ width: "70px" }}
            alt="product"
            src={renderImage(item.images)}
          ></img>
        </td>
        <td>{item.quantity}EA</td>
        <td>{item.size}</td>
        <td>{item.price}</td>
        <td>
          <button onClick={() => deleteFromCart(item._id, item.size)}>
            remove
          </button>
        </td>
      </tr>
    ));
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Quantity</th>
            <th>Size</th>
            <th>Stamps</th>
            <th>remove from cart</th>
          </tr>
        </thead>
        <tbody>{products ? renderItems() : null}</tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
};

export default CartBlocks;
