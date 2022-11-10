import { React, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  GetCartItems,
  RemoveCartItem,
  OrderProduct,
} from "../../../_actions/user_actions";
import CartBlocks from "./sections/CartBlocks";
import { useSelector } from "react-redux";
import { Empty, Result } from "antd";

const CartPage = () => {
  const dispatch = useDispatch();
  const [totalCost, setTotalCost] = useState(0);
  const [showTotal, setShowTotal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  let cart = useSelector((state) => state.userReducer.cartDetail);
  let user = useSelector((state) => state.userReducer.userData);
  useEffect(() => {
    let cartItemsIds = [];
    if (user && user.cart) {
      if (user.cart.length > 0) {
        user.cart.map((item) => cartItemsIds.push(item.id));
      }
      //cart에 있는 아이템 정보와 그 아이템의 quantity 합침
      dispatch(GetCartItems(cartItemsIds, user.cart)).then((response) =>
        computeTotalCost(response.payload)
      );
    }
  }, [user]);
  const computeTotalCost = (cartitems) => {
    let total = 0;
    cartitems.map(
      (item) => (total += item.quantity * parseInt(item.price, 10))
    );
    setTotalCost(total);
    setShowTotal(true);
  };
  const deleteFromCart = (productId) => {
    dispatch(RemoveCartItem(productId)).then((response) => {
      if (!response.payload.productId) {
        setShowTotal(false);
      }
    });
  };
  const onOrderClick = () => {
    //카트 정보 넘겨줘서 productHistory에 넣어주고 stamp 차감
    let res = false;
    if (totalCost > user.stamp) {
      alert("not enough stamps");
    } else {
      res = window.confirm("주문하시겠습니까?");
    }
    if (res) {
      dispatch(OrderProduct(cart, totalCost)).then((response) => {
        console.log(response);
        if (response.payload.success) {
          setShowTotal(false);
          setShowSuccess(true);
        }
      });
    }
  };
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h3>My Cart</h3>
      {user ? `현재 보유 stamps : ${user.stamp}` : ""}
      <div>
        <CartBlocks products={cart} deleteFromCart={deleteFromCart} />
      </div>

      {showTotal ? (
        <div style={{ marginTop: "3rem" }}>
          <h2>Total Cost {totalCost} stamps</h2>
          <input type="button" value="Order" onClick={onOrderClick} />
        </div>
      ) : showSuccess ? (
        <Result status="success" title="Successfully Ordered items" />
      ) : (
        <div style={{ marginTop: "3rem" }}>
          <Empty description={false} />
        </div>
      )}
    </div>
  );
};

export default CartPage;
