import React from "react";
import { Menu } from "antd";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const LeftMenu = (props) => {
  return (
    //key : item의 고유 id
    <Menu mode={props.mode}>
      <Menu.Item key="Home">
        <a href="/">Home</a>
      </Menu.Item>
      <Menu.Item key="Men">
        <a href="/product">Men</a>
      </Menu.Item>
      <Menu.Item key="Women">
        <a href="/product">Women</a>
      </Menu.Item>
    </Menu>
  );
};
export default LeftMenu;
