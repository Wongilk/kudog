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
  const renderOrderHistory = (item) => {
    return item.map((element, index) => (
      <tr className="border-bottom" key={index}>
        {console.log(element)}
        <td>{element.address}</td>
        <td>{element.brand}</td>
        <td>{element.productName}</td>
        <td>{element.size}</td>
        <td>{element.quantity}</td>
        <td>{element.stamps}</td>
        <td>{element.date}</td>
        <td>
          {element.dateOfReturn
            ? element.dateOfReturn.split(".").slice(0, 3).join(" .")
            : "배송중…"}
        </td>
        <td>
          {element.review ? (
            "written"
          ) : (
            <button
              className="btn btn-default border"
              onClick={() => onWriteReviewClick(element)} //수정
            >
              review
            </button>
          )}
        </td>
      </tr>
    ));
  };
  const renderPaymentHistory = (item) => {
    return item.map((element, index) => (
      <tr className="border-bottom" key={index}>
        <td>{element.email}</td>
        <td>{element.paymentData.orderID}</td>
        <td>{element.price}</td>
        <td>{element.stampNum}</td>
        <td>{element.dateofPurchase}</td>
      </tr>
    ));
  };
  return (
    <div className="m-1 mr-5 p-5 border" style={{ width: "70%" }}>
      <h1>HistoryPage</h1>

      <h3>Stamp History</h3>
      <table>
        <thead>
          <tr className="border-bottom">
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

      <h3>Product History</h3>
      <table className="border-bottom">
        <thead>
          <tr className="border-bottom">
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
          {orders && orders.map((item) => renderOrderHistory(item.order))}
          {/**수정 */}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryPage;
