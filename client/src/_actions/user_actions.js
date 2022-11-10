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

async function GetCartItems(cartItemsIds, userCart) {
  //여러개의 아이템을 가져와야 함, id 여러개 줌
  //response.data => id에 해당하는 상품 정보
  const Items = [];
  const pushItem = (productDetail, quantity, size, i) => {
    const product = JSON.parse(JSON.stringify(productDetail));
    console.log(product, quantity, size, i);
    Items.push(product);
    Items[i].size = size;
    Items[i].quantity = quantity;
  };

  const request = await axios
    .get(`/api/products/product_by_id?id=${cartItemsIds}&type=array`)
    .then(
      (response) => {
        for (let i = 0; i < userCart.length; i++) {
          console.log(userCart[i]);
          for (let j = 0; j < response.data.length; j++) {
            console.log(response.data[j]);
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
        /*userCart.map(
          (cartItem) =>
            //productDeetail => id에 해당하는 상품
            response.data.map((productDetail, index) => {
              if (cartItem.id === productDetail._id) {
                pushItem(productDetail);
                Items[index].quantity = cartItem.quantity;
                Items[index].size = cartItem.size;
                //response.data[index].size = cartItem.size;
              }
            })
          //return response.data;
        );*/
      }
      //id에 해당하는 cartItems를 가져오고 quantity정보와 합쳐줌 =>quantity는 user에 cart정보는 product에 있기 때문
    );
  console.log(Items);
  return {
    type: GET_CART_ITEMS,
    payload: Items,
  };
}

async function RemoveCartItem(productId) {
  const request = await axios
    .get(`/api/users/removecartitem?id=${productId}`)
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

async function OnBuySuccess(data) {
  const request = await axios
    .post("/api/users/successbuy", data)
    .then((response) => response.data);
  return {
    type: ON_BUY_SUCCESS,
    payload: request,
  };
}

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
async function ChangeAddress(address, detailAddress) {
  let body = {
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
};
