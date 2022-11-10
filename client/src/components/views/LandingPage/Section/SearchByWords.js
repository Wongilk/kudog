import React, { useState } from "react";
import { Input } from "antd";
const { Search } = Input;
const SearchByWords = ({ refreshSearch }) => {
  const [searchWord, setSearchWord] = useState("");
  const onChange = (e) => {
    setSearchWord(e.currentTarget.value);
    refreshSearch(e.currentTarget.value);
  };
  return (
    <div>
      <Search
        placeholder="input search text"
        onChange={onChange}
        style={{ width: 200 }}
        value={searchWord}
      />
    </div>
  );
};

export default SearchByWords;
