import axios from "axios";
import React, { useEffect, useState } from "react";

import { Typography } from "antd";
const { Title } = Typography;

const DeliverPage = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getNotDelivered();
  }, []);
  const getNotDelivered = () => {
    axios.post("/api/orders/get_not_deliver_check").then((response) => {
      if (response.data.success) {
        setOrders(response.data.orderInfo);
      }
    });
  };

  const onDeliverdClick = (item) => {
    console.log(item);
    let body = {
      order_id: item._id,
      orderInfo: item.order,
    };
    axios.post("/api/orders/deliver_check", body).then((response) => {
      if (response.data.success) {
        alert("배송 완료");
        getNotDelivered();
      }
    });
  };

  const renderOrders = (item) => {
    console.log(item);
    return item.order.map((element, index) => (
      <tr key={index}>
        <td>{element.email}</td>
        <td>{element.brand}</td>
        <td>{element.productName}</td>
        <td>{element.size}</td>
        <td>{element.quantity}</td>
        <td>{element.stamps}</td>
        <td>{element.date}</td>
        <th>{element.dateOfReturn}</th>
        <th>
          <button
            className="btn btn-default border"
            onClick={() => onDeliverdClick(item)}
          >
            Delivered
          </button>
        </th>
      </tr>
    ));
  };

  return (
    <div className="" style={{ width: "70%" }}>
      <Title className="mb-3" level={3}>
        Not checked Products
      </Title>
      <table>
        <thead>
          <tr>
            <th>Buyer</th>
            <th>Brand</th>
            <th>ProductName</th>
            <th>size</th>
            <th>Quantity</th>
            <th>Stamps</th>
            <th>DateofPurchase</th>
            <th>DateofReturn</th>
            <th>Delivered</th>
          </tr>
        </thead>
        <tbody>{orders && orders.map((item) => renderOrders(item))}</tbody>
      </table>
    </div>
  );
};

export default DeliverPage;
