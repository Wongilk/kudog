import React from "react";
import { useSelector } from "react-redux";
const HistoryPage = () => {
  const user = useSelector((state) => state.userReducer);

  const renderHistory = (item) => {
    return item.map((element, index) => (
      <tr key={index}>
        <td>{element.email}</td>
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
    <div style={{ width: "80%", margin: "3rem auto" }}>
      <h2>Order History</h2>
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
      {/*producthistory*/}
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Address</th>
            <th>Brand</th>
            <th>ProductName</th>
            <th>size</th>
            <th>Quantity</th>
            <th>Stamps</th>
            <th>DateofPurchase</th>
          </tr>
        </thead>
        <tbody>
          {user.userData &&
            user.userData.productHistory.map((item) => renderHistory(item))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryPage;
