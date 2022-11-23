import axios from "axios";
import React, { useEffect, useState } from "react";
const HistoryPage = ({ onWriteReviewClick }) => {
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  useEffect(() => {
    getOrder();
    getPayment();
  }, []);

  const getOrder = () => {
    axios.post("/api/orders/get_orders").then((response) => {
      setOrders(response.data.orderInfo);
    });
  };
  const getPayment = () => {
    axios.post("/api/payments/get_payments").then((response) => {
      setPayments(response.data.paymentInfo);
    });
  };
  const renderOrderHistory = (item, item_id) => {
    return item.map((element, index) => (
      <tr key={index}>
        {console.log(element.review)}
        <td>{element.address}</td>
        <td>{element.brand}</td>
        <td>{element.productName}</td>
        <td>{element.size}</td>
        <td>{element.quantity}</td>
        <td>{element.stamps}</td>
        <td>{element.date}</td>
        <td>{element.dateOfReturn}</td>
        <td>
          {element.review ? (
            "written"
          ) : (
            <button onClick={() => onWriteReviewClick(element, item_id)}>
              Write review
            </button>
          )}
        </td>
      </tr>
    ));
  };
  const renderPaymentHistory = (item) => {
    return item.map((element, index) => (
      <tr key={index}>
        <td>{element.email}</td>
        <td>{element.paymentData.orderID}</td>
        <td>{element.price}</td>
        <td>{element.stampNum}</td>
        <td>{element.dateofPurchase}</td>
      </tr>
    ));
  };
  return (
    <div>
      <h1>HistoryPage</h1>

      <h1>Stamp History</h1>
      <br />
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>orderID</th>
            <th>Price</th>
            <th>stampNum</th>
            <th>Date of Purchase</th>
          </tr>
        </thead>
        <tbody>
          {payments &&
            payments.map((item) => renderPaymentHistory(item.payment))}
        </tbody>
      </table>
      <br />

      <h1>Product History</h1>
      <table>
        <thead>
          <tr>
            <th>Address</th>
            <th>Brand</th>
            <th>ProductName</th>
            <th>size</th>
            <th>Quantity</th>
            <th>Stamps</th>
            <th>DateofPurchase</th>
            <th>DateofReturn</th>
            <th>review button</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((item) => renderOrderHistory(item.order, item._id))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryPage;
