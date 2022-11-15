import { React, useEffect, useState } from "react";
import { Menu } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RightMenu = (props) => {
  const navigate = useNavigate();
  //useSelector : redux store 상태에 접근
  // 상태값이 바뀐 경우 바뀐 값을 가져와 재 랜더링
  //userReducer에서 반환한 user상태 가져오기
  const user = useSelector((state) => state.userReducer);

  //로그인이 안되어있으면
  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Sign in</a>
        </Menu.Item>
        {/* <Menu.Item key="app">
          <a href="/register">Sign up</a>
        </Menu.Item> */}
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        {user.userData && user.userData.isAdmin ? (
          <Menu.Item key="upload">
            <a href="/upload">Upload</a>
          </Menu.Item>
        ) : (
          ""
        )}

        <Menu.Item key="mypage">
          <a className="text-decoration-none" href="/mypage">
            MyPage
          </a>
        </Menu.Item>

        <Menu.Item key="cart">
          <a className="text-decoration-none" href="/user/cart">
            Cart
          </a>
        </Menu.Item>
        {/* 
        <Menu.Item key="logout">
          <a onClick={onLogoutClick}>Logout</a>
        </Menu.Item> */}
      </Menu>
    );
  }
};
export default RightMenu;
