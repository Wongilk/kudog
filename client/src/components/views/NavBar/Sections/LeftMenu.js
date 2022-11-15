import React, { useState } from "react";
import { Input } from "antd";
const { Search } = Input;
const LeftMenu = ({ refreshSearch }) => {
  const [searchWord, setSearchWord] = useState("");
  const onChange = (e) => {
    setSearchWord(e.currentTarget.value);
    refreshSearch(e.currentTarget.value);
  };
  return (
    <div>
      <Search
        placeholder="Search"
        onChange={onChange}
        style={{ width: 200 }}
        value={searchWord}
      />
    </div>
  );
};

export default LeftMenu;
