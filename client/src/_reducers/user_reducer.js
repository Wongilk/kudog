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
} from "../_actions/types";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loginSuccess: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
      };
    case REGISTER_USER:
      return {
        ...state,
        loginSuccess: action.payload,
      };
    case AUTH_USER:
      return {
        ...state,
        userData: action.payload,
      };
    case ADD_TO_CART:
      return {
        ...state,
        userData: {
          ...state.userData,
          cart: action.payload,
        },
      };
    case GET_CART_ITEMS:
      return {
        ...state,
        cartDetail: action.payload,
      };
    case REMOVE_CART_ITEM:
      return {
        ...state,
        userData: {
          ...state.userData,
          cart: action.payload.cart,
        },
        cartDetail: action.payload.productInfo,
      };

    case ON_BUY_SUCCESS:
      return {
        ...state,
        userData: {
          ...state.userData,
        },
      };

    case ORDER_PRODUCT:
      return {
        ...state,
        userData: {
          ...state.userData,
          cart: action.payload.userInfo.cart,
        },
        cartDetail: action.payload.userInfo.cartDetail,
      };
    case CHANGE_ADDRESS:
      return {
        ...state,
        userData: {
          ...state.userData,
          address: action.payload.userInfo.address,
        },
      };
    case CHANGE_PHONENUMBER:
      console.log(action.payload);
      return {
        ...state,
        userData: {
          ...state.userData,
          phoneNumber: action.payload.userInfo.phoneNumber,
        },
      };
    default:
      return state;
  }
};
export default userReducer;
