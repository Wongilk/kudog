import React, { useState } from "react";
import { Input } from "antd";
const { Search } = Input;
const LeftMenu = ({ refreshSearch }) => {
  const [searchWord, setSearchWord] = useState("");
  const onChange = (e) => {
    setSearchWord(e.currentTarget.value);
    refreshSearch(e.currentTarget.value);
  };
  return <div></div>;
};

export default LeftMenu;
