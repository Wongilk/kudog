import Item from "antd/lib/list/Item";
import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART,
  GET_CART_ITEMS,
  REMOVE_CART_ITEM,
  ON_BUY_SUCCESS,
  ORDER_PRODUCT,
  CHANGE_ADDRESS,
  CHANGE_PHONENUMBER,
} from "./types";

async function LoginUser(dataToSubmit) {
  const request = await axios
    .post("/api/users/login", dataToSubmit)
    .then((response) => response.data);
  console.log(request);
  return {
    type: LOGIN_USER,
    payload: request,
  };
}
async function RegisterUser(dataToSubmit) {
  const request = await axios
    .post("/api/users/register", dataToSubmit)
    .then((response) => response.data);
  return {
    type: REGISTER_USER,
    payload: request,
  };
}
async function AuthUser() {
  const request = await axios
    .get("/api/users/auth")
    .then((response) => response.data);
  return {
    type: AUTH_USER,
    payload: request,
  };
}
async function LogoutUser() {
  const request = await axios
    .get("/api/users/logout")
    .then((response) => response.data);
  return {
    type: LOGOUT_USER,
    payload: request,
  };
}
async function AddToCart(productId, selectSize) {
  let body = {
    productId: productId,
    size: selectSize,
  };
  const request = await axios
    .post("/api/users/addtocart", body)
    .then((response) => response.data);
  return {
    type: ADD_TO_CART,
    payload: request,
  };
}

//수정
async function GetCartItems(cartItemsIds, userCart) {
  //카트 속 여러개의 아이템을 가져와야 함 => 상품 id 여러개 줌
  //response.data => id에 해당하는 상품 정보
  const Items = []; //return value 카트에 들어감
  //size가 다르지만 같은 상품인 경우를 위해

  const pushItem = (productDetail, quantity, size, i) => {
    //깊은 복사 후 사이즈 별 카트 아이템 생성
    const product = JSON.parse(JSON.stringify(productDetail));
    Items.push(product);
    Items[i].sizeAndQuantity = [{ size: size, quantity: quantity }];
    console.log(Items);
  };

  const request = await axios
    .get(`/api/products/product_by_id?id=${cartItemsIds}&type=array`)
    .then(
      (response) => {
        for (let i = 0; i < userCart.length; i++) {
          console.log(userCart[i]);
          for (let j = 0; j < response.data.length; j++) {
            if (userCart[i].id === response.data[j]._id) {
              pushItem(
                response.data[j],
                userCart[i].quantity,
                userCart[i].size,
                i
              );
            }
          }
        }
      }
      //id에 해당하는 cartItems를 가져오고 quantity정보와 합쳐줌 =>quantity는 user에 cart정보는 product에 있기 때문
    );
  return {
    type: GET_CART_ITEMS,
    payload: Items,
  };
}
async function RemoveCartItem(productId, size) {
  const request = await axios
    .get(`/api/users/removecartitem?id=${productId}&&size=${size}`)
    .then(
      //id에 해당하는 cartItems를 가져오고 quantity정보와 합쳐줌 =>quantity는 user에 cart정보는 product에 있기 때문
      // productInfo : remove한 후 남은 상품 정보들, cart : 유저의 카트정보
      (response) => {
        response.data.cart.forEach((cartitem) => {
          response.data.productInfo.forEach((productdetail, index) => {
            if (productdetail._id === cartitem.id) {
              response.data.productInfo[index].quantity = cartitem.quantity;
            }
          });
        });
        return response.data;
      }
    );
  return {
    type: REMOVE_CART_ITEM,
    payload: request,
  };
}
//stamp 구매 성공시
async function OnBuySuccess(data) {
  const request = await axios
    .post("/api/users/successbuy", data)
    .then((response) => response.data);
  return {
    type: ON_BUY_SUCCESS,
    payload: request,
  };
}
//상품 주문시
async function OrderProduct(cart, totalCost) {
  let body = {
    cart: cart,
    totalCost: totalCost,
  };
  const request = await axios
    .post("/api/users/orderproduct", body)
    .then((response) => response.data);
  return {
    type: ORDER_PRODUCT,
    payload: request,
  };
}
//주소 변환시
async function ChangeAddress(address, detailAddress) {
  let body = {
    //address가 api로 받은 주소 , detailaddress가 사용자가 입력한 상세주소
    address: address,
    detailAddress: detailAddress,
  };
  const request = await axios
    .post("/api/users/change_address", body)
    .then((response) => response.data);
  return {
    type: CHANGE_ADDRESS,
    payload: request,
  };
}
//전화번호 변경
async function ChangePhoneNumber(newPhoneNumber) {
  let body = {
    phoneNumber: newPhoneNumber,
  };
  const request = await axios
    .post("/api/users/change_phonenumber", body)
    .then((response) => response.data);
  return {
    type: CHANGE_PHONENUMBER,
    payload: request,
  };
}
export {
  LoginUser,
  RegisterUser,
  AuthUser,
  LogoutUser,
  AddToCart,
  GetCartItems,
  RemoveCartItem,
  OnBuySuccess,
  OrderProduct,
  ChangeAddress,
  ChangePhoneNumber,
};
