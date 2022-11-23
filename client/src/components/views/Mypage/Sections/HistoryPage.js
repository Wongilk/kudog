import axios from "axios";
import React, { useEffect, useState } from "react";

const HistoryPage = () => {
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
      <tr key={index}>
        <td>{element.address}</td>
        <td>{element.brand}</td>
        <td>{element.productName}</td>
        <td>{element.size}</td>
        <td>{element.quantity}</td>
        <td>{element.stamps}</td>
        <td>{element.date}</td>
        <td>{element.dateOfReturn}</td>
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
  console.log(orders);
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
          {orders && orders.map((item) => renderOrderHistory(item.order))}
        </tbody>
      </table>
    </div>
  );
  /*
  const user = useSelector((state) => state.userReducer);

  const renderHistory = (item) => {
    return item.map((element, index) => (
      <tr key={index}>
        <td>{element.address}</td>
        <td>{element.brand}</td>
        <td>{element.productName}</td>
        <td>{element.size}</td>
        <td>{element.quantity}</td>
        <td>{element.stamps}</td>
        <td>{element.date}</td>
      </tr>
    ));
  };
  return (
    //product 구매 기록과 stamp 구매 기록 두 개 보여주기
    <div className="m-1 mr-5 p-5 border" style={{ width: "70%" }}>
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
          {user.userData &&
            user.userData.paymentHistory.map((item) =>
              item.map((element, index) => (
                <tr key={index}>
                  <td>{element.email}</td>
                  <td>{element.paymentData.orderID}</td>
                  <td>$ {element.price}</td>
                  <td>{element.stampNum}</td>
                  <td>{element.dateofPurchase}</td>
                </tr>
              ))
            )}
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
          {user.userData &&
            user.userData.productHistory.map((item) => renderHistory(item))}
        </tbody>
      </table>
    </div>
  );*/
};

export default HistoryPage;
