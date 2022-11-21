import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Address from "../../../../utils/Address";
import { useDispatch } from "react-redux";
import { ChangePhoneNumber } from "../../../../_actions/user_actions";
const MyAccountPage = () => {
  const user = useSelector((state) => state.userReducer.userData);
  const [changePwd, setChangePwd] = useState(false);
  const [newPwd, setNewPwd] = useState("");
  const [newConfirmPwd, setNewConfirmPwd] = useState("");
  const [changeAddress, setChangeAddress] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [changePhoneNumber, setChangePhoneNumber] = useState(false);
  const dispatch = useDispatch();

  const onAddressChange = () => {
    setChangeAddress(true);
  };
  //변경 버튼 click
  const onPasswordChange = () => {
    setChangePwd(true);
  };
  const onPhoneNumberChange = () => {
    setChangePhoneNumber(true);
  };

  //바꿀 pWd
  const newPwdChange = (e) => {
    setNewPwd(e.target.value);
  };
  //바꿀 pwd check
  const newConfirmPwdChange = (e) => {
    setNewConfirmPwd(e.target.value);
  };
  const newPhoneNumberChange = (e) => {
    setNewPhoneNumber(e.target.value);
  };

  const onPwdChangeClick = () => {
    //기존 pwd 체크 후 변경 , reset_password 재사용
    if (newPwd === newConfirmPwd) {
      let body = {
        email: user.email,
        password: newPwd,
      };
      axios.post("/api/users/reset_password", body).then((response) => {
        console.log(response.data);
        if (response.data.resetSuccess) {
          alert("Password is changed");
        }
        setChangePwd(false);
      });
    } else {
      alert("newPassword is not same as confirm password");
    }
  };
  const onPhoneNumberChangeClick = () => {
    dispatch(ChangePhoneNumber(newPhoneNumber)).then((response) => {
      setChangePhoneNumber(false);
      setNewPhoneNumber("");
    });
  };

  return (
    <div className="m-1 mr-5 p-5 border" style={{ width: "70%" }}>
      <h1 className="mb-4">My Account</h1>

      <p>Name : {user && user.name}</p>
      <p>Email : {user && user.email}</p>
      <p>Address : {user && user.address}</p>
      <p>phoneNumber : {user && user.phoneNumber}</p>
      <p>Remaining Stamps : {user && user.stamp}</p>

      <button class="btn btn-default border" onClick={onAddressChange}>
        Change address
      </button>
      {changeAddress ? <Address user={user} /> : ""}

      <button class="m-3 btn btn-default border" onClick={onPhoneNumberChange}>
        Change phoneNumber
      </button>
      {changePhoneNumber ? (
        <div>
          <form>
            <label>Enter new phoneNumber</label>
            <input
              type="tel"
              value={newPhoneNumber}
              onChange={newPhoneNumberChange}
            />
            <input
              type="button"
              value="Change"
              onClick={onPhoneNumberChangeClick}
            />
          </form>
        </div>
      ) : (
        ""
      )}

      <button class="btn btn-default border" onClick={onPasswordChange}>
        Change password
      </button>
      {changePwd ? (
        <div>
          <form>
            <label>Enter new password </label>
            <input value={newPwd} onChange={newPwdChange} />
            <br />
            <label>Enter confirm password</label>
            <input value={newConfirmPwd} onChange={newConfirmPwdChange} />

            <input type="button" value="Change" onClick={onPwdChangeClick} />
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MyAccountPage;
