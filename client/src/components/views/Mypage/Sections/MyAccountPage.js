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
      <p>Remaining Stamps : {user && user.stamp}</p>
      <p>phoneNumber : {user && user.phoneNumber}</p>
      <p>
        <button class="btn btn-default border" onClick={onAddressChange}>
          Change address
        </button>
        {changeAddress ? <Address user={user} /> : ""}
      </p>

      <p>
        <button class="btn btn-default border" onClick={onPhoneNumberChange}>
          Change phoneNumber
        </button>

        {changePhoneNumber ? (
          <div className="m-3">
            <form>
              <p>
                <input
                  className="border p-2 w-50"
                  type="tel"
                  placeholder="Enter new phoneNumber"
                  value={newPhoneNumber}
                  onChange={newPhoneNumberChange}
                />
              </p>
              <p>
                <input
                  type="button"
                  className="btn btn-secondary border"
                  value="Change"
                  onClick={onPhoneNumberChangeClick}
                />
              </p>
            </form>
          </div>
        ) : (
          ""
        )}
      </p>

      <p>
        <button class="btn btn-default border" onClick={onPasswordChange}>
          Change password
        </button>
        {changePwd ? (
          <div className="m-3">
            <form>
              <p>
                <input
                  className="border p-2 w-50"
                  placeholder="Enter new password"
                  value={newPwd}
                  onChange={newPwdChange}
                />
              </p>

              <p>
                <input
                  className="border p-2 w-50"
                  placeholder="Enter confirm password"
                  value={newConfirmPwd}
                  onChange={newConfirmPwdChange}
                />
              </p>

              <p>
                <input
                  className="btn btn-secondary border"
                  type="button"
                  value="Change"
                  onClick={onPwdChangeClick}
                />
              </p>
            </form>
          </div>
        ) : (
          ""
        )}
      </p>
    </div>
  );
};

export default MyAccountPage;
