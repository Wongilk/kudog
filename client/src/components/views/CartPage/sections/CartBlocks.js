import React from "react";
import "./CartBlock.css";
const CartBlocks = ({ products, deleteFromCart }) => {
  const renderImage = (images) => {
    if (images.length > 0) {
      let image = images[0];
      return `http://localhost:5000/${image}`;
    }
  };
  console.log(products);
  const renderItems = () =>
    products.map((item, index) => (
      <tr key={index}>
        <td>
          <img
            className="fill"
            style={{ width: "100px", height: "100px" }}
            alt="product"
            src={renderImage(item.images)}
          ></img>
        </td>
        <td>{item.brand}</td>
        <td>{item.title}</td>
        <td>{item.sizeAndQuantity[0].quantity}EA</td>
        <td>{item.sizeAndQuantity[0].size}</td>
        <td>{item.price}</td>
        <td className="text-center">
          <button
            className="text-center btn border"
            onClick={() =>
              deleteFromCart(item._id, item.sizeAndQuantity[0].size)
            }
          >
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
            <th>Brand</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Size</th>
            <th>Stamps</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{products ? renderItems() : null}</tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
};

export default CartBlocks;
//수정
