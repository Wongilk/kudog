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
      <div className="m-3 w-50">
        {
          <DaumPostcode
            className=""
            onComplete={selectAddress} // 값을 선택할 경우 실행되는 이벤트
            autoClose // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
            defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
          />
        }
      </div>
      {enterAddress ? (
        <div className="m-3">
          <p>
            <input className="border p-2 w-50" value={address} />
          </p>
          <p>
            <input
              className="border p-2 w-50"
              value={detailAddress}
              onChange={onDetailAddChange}
              placeholder="Enter Detail Address"
            />
          </p>
          <p>
            <input
              className="btn btn-secondary border"
              type="button"
              value="Change"
              onClick={onChangeButtonClick}
            />
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Address;
