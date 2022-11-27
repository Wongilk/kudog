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
import Address from "../../../utils/Address";

const CartPage = () => {
  const dispatch = useDispatch();
  const [totalCost, setTotalCost] = useState(0);
  const [showTotal, setShowTotal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  let cart = useSelector((state) => state.userReducer.cartDetail);
  let user = useSelector((state) => state.userReducer.userData);
  const [changeAddress, setChangeAddress] = useState(false);
  const onAddressChange = () => {
    setChangeAddress(true);
  };
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
    console.log(cartitems);
    let total = 0;
    cartitems.map(
      (item) =>
        (total += item.sizeAndQuantity[0].quantity * parseInt(item.price, 10))
    );
    setTotalCost(total);
    setShowTotal(true);
  };
  const deleteFromCart = (productId, size) => {
    dispatch(RemoveCartItem(productId, size)).then((response) => {
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
      //수정
      if (user.address) {
        dispatch(OrderProduct(cart, totalCost)).then((response) => {
          console.log(response);
          if (response.payload.success) {
            console.log("proinfo", response.payload.productInfo);
            setShowTotal(false);
            setShowSuccess(true);
          }
        });
      } else {
        alert("배송지를 설정해주세요");
      }
    }
  };
  return (
    <div className="container" style={{ width: "85%", margin: "3rem auto" }}>
      <h3 className="mb-4">My Cart</h3>
      <strong>
        <p className="text-end text-muted m-1">
          {user ? `현재 보유 중인 stamps : ${user.stamp}` : ""}
        </p>
      </strong>
      <div>
        <CartBlocks products={cart} deleteFromCart={deleteFromCart} />
      </div>

      {showTotal ? (
        <div className="mt-4">
          <div>
            <address>
              {" "}
              배송지 :<strong> {user.name}</strong>
              <br />
              {user.address}
              <br />
              <abbr title="Phone">P:</abbr> {user.phoneNumber}
            </address>
            <button
              class="btn btn-default border mb-5"
              onClick={onAddressChange}
            >
              배송지 변경
            </button>
            {changeAddress ? <Address user={user} /> : ""}
          </div>
          <h3>Total Cost {totalCost} stamps</h3>
          <input
            className="btn btn-secondary mb-5"
            style={{ width: "100%", height: "60px" }}
            type="button"
            value="Order"
            onClick={onOrderClick}
          />
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
//수정
