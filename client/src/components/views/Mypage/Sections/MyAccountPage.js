import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Address from "../../../../utils/Address";
const MyAccountPage = () => {
  const user = useSelector((state) => state.userReducer.userData);
  const [changePwd, setChangePwd] = useState(false);
  const [newPwd, setNewPwd] = useState("");
  const [newConfirmPwd, setNewConfirmPwd] = useState("");
  const [changeAddress, setChangeAddress] = useState(false);
  const onAddressChange = () => {
    setChangeAddress(true);
  };
  //변경 버튼 click
  const onPasswordChange = () => {
    setChangePwd(true);
  };
  //바꿀 pWd
  const newPwdChange = (e) => {
    setNewPwd(e.target.value);
  };
  //바꿀 pwd check
  const newConfirmPwdChange = (e) => {
    setNewConfirmPwd(e.target.value);
  };

  const Change = () => {
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
  return (
    <div>
      <h1>My Account</h1>

      <p>Name : {user && user.name}</p>
      <p>Email : {user && user.email}</p>
      <p>Address : {user && user.address}</p>
      <p>Remaining Stamps : {user && user.stamp}</p>
      <button onClick={onAddressChange}>Change address</button>
      {changeAddress ? <Address user={user} /> : ""}

      <br />
      <button onClick={onPasswordChange}>Change password</button>

      {changePwd ? (
        <div>
          <form>
            <label>Enter new password </label>
            <input value={newPwd} onChange={newPwdChange} />
            <br />
            <label>Enter confirm password</label>
            <input value={newConfirmPwd} onChange={newConfirmPwdChange} />

            <input type="button" value="Change" onClick={Change} />
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MyAccountPage;
