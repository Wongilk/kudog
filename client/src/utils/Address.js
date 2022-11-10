import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import { useDispatch } from "react-redux";
import { ChangeAddress } from "../_actions/user_actions";
const Address = () => {
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [enterAddress, setEnterAddress] = useState(false);
  const dispatch = useDispatch();
  const selectAddress = (data) => {
    setAddress(data.address);
    setEnterAddress(true);
    console.log(data);
  };
  const onDetailAddChange = (e) => {
    setDetailAddress(e.target.value);
  };
  const onChangeButtonClick = () => {
    dispatch(ChangeAddress(address, detailAddress)).then((response) => {
      if (response.payload.success) {
        setAddress("");
        setDetailAddress("");
        setEnterAddress(false);
        alert("Changed Address!");
      }
    });
  };
  return (
    <div>
      <h1>Address</h1>
      <div>
        {
          <DaumPostcode
            onComplete={selectAddress} // 값을 선택할 경우 실행되는 이벤트
            autoClose // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
            defaultQuery="판교역로 235" // 팝업을 열때 기본적으로 입력되는 검색어
          />
        }
      </div>
      {enterAddress ? (
        <div>
          <input value={address} />
          <input
            value={detailAddress}
            onChange={onDetailAddChange}
            placeholder="Enter Detail Address"
          />
          <input type="button" value="Change" onClick={onChangeButtonClick} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Address;
