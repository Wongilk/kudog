import axios from "axios";
import React, { useEffect, useState } from "react";

import { Typography } from "antd";
const { Title } = Typography;

const DeliverPage = () => {
  //const [NDeliveredOrders, setNDeliveredOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  useEffect(() => {
    //getNotDelivered();
    getAllOrders();
  }, []);

  /*const getNotDelivered = () => {
    axios.post("/api/orders/get_not_deliver_check").then((response) => {
      if (response.data.success) {
        setNDeliveredOrders(response.data.orderInfo);
      }
    });
  };*/
  const getAllOrders = () => {
    axios.post("/api/orders/get_all_orders").then((response) => {
      if (response.data.success) {
        setAllOrders(response.data.orderInfo);
      }
    });
  };

  const onDeliverdClick = (item, element) => {
    console.log(item);
    let body = {
      order_id: item._id,
      orderInfo: element,
    };
    axios.post("/api/orders/deliver_check", body).then((response) => {
      if (response.data.success) {
        alert("배송 완료");
        getAllOrders();
      }
    });
  };

  const onReturnClick = (item, element) => {
    let body = {
      order_id: item._id,
      orderInfo: element,
    };
    axios.post("/api/orders/return_check", body).then((response) => {
      if (response.data.success) {
        alert("반납 완료");
        getAllOrders();
      }
    });
  };
  const renderAllOrders = (item) => {
    return item.order.map((element, index) => (
      <tr key={index}>
        <td>{element.email}</td>
        <td>{element.productName}</td>
        <td>{element.size}</td>
        <td>{element.quantity}</td>
        <td>{element.stamps}</td>
        <td>{element.date}</td>
        <td>{element.dateOfReturn}</td>
        {element.dateOfReturn ? (
          <td>배송 완료</td>
        ) : (
          <td>
            <button
              className="btn btn-default border"
              onClick={() => onDeliverdClick(item, element)}
            >
              배송 완료 처리
            </button>
          </td>
        )}
        {element.isReturned ? (
          <td>반납 완료</td>
        ) : (
          <td>
            <button
              className="btn btn-default border"
              onClick={() => onReturnClick(item, element)} //item은 주문 전체 element는 그 중 하나 요소
            >
              반납 완료 처리
            </button>
          </td>
        )}
      </tr>
    ));
  };

  /*const renderNDeliveredOrders = (item) => {
    return item.order.map((element, index) => (
      <tr key={index}>
        <td>{element.email}</td>
        <td>{element.brand}</td>
        <td>{element.productName}</td>
        <td>{element.size}</td>
        <td>{element.quantity}</td>
        <td>{element.stamps}</td>
        <td>{element.date}</td>
        <td>
          <button
            className="btn btn-default border"
            onClick={() => onDeliverdClick(item)}
          >
            Delivered
          </button>
        </td>
      </tr>
    ));
  };*/

  return (
    <div className="" style={{ width: "70%" }}>
      {/**<Title className="mb-3" level={3}>
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
        <tbody>
          {NDeliveredOrders &&
            NDeliveredOrders.map((item) => renderNDeliveredOrders(item))}
        </tbody>
      </table> */}

      <Title className="mb-3" level={3}>
        주문 관리
      </Title>
      <table>
        <thead>
          <tr>
            <th>Buyer</th>
            <th>ProductName</th>
            <th>size</th>
            <th>Quantity</th>
            <th>Stamps</th>
            <th>DateofPurchase</th>
            <th>DateofReturn</th>
            <th>배송 여부</th>
            <th>반납여부</th>
          </tr>
        </thead>
        <tbody>
          {allOrders && allOrders.map((item) => renderAllOrders(item))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliverPage;
