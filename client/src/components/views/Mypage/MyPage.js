import { React, useState } from "react";
import { USER_SERVER } from "../../Config";
import HistoryPage from "./Sections/HistoryPage";
import MyAccountPage from "./Sections/MyAccountPage";
import StampPage from "./Sections/StampPage";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState(true);
  const [address, setAddress] = useState(false);
  const [wallet, setWallet] = useState(false);
  const [history, setHistory] = useState(false);
  const [stamp, setStamp] = useState(false);

  const onAccountClick = () => {
    setAccount(true);
    setAddress(false);
    setWallet(false);
    setHistory(false);
    setStamp(false);
  };
  const onHistoryClick = () => {
    setAccount(false);
    setAddress(false);
    setWallet(false);
    setHistory(true);
    setStamp(false);
  };
  const onStampClick = () => {
    setAccount(false);
    setAddress(false);
    setWallet(false);
    setHistory(false);
    setStamp(true);
  };
  const onLogoutClick = async () => {
    await axios.get(`${USER_SERVER}/logout`).then((response) => {
      console.log(response);
      if (response.status === 200) {
        alert("로그아웃 완료");
        navigate("/");
      } else alert("로그아웃 실패");
    });
  };
  return (
    <div className="d-flex">
      <div className="m-5 mt-1">
        <div className="p-5 border">
          <h1 className="mb-4">MyPage</h1>

          <ul style={{ listStyleType: "none" }}>
            <li>
              <a
                onClick={onAccountClick}
                style={{ textDecoration: "none", color: "black" }}
              >
                My Account
              </a>
            </li>
            <li>
              <a
                onClick={onHistoryClick}
                style={{ textDecoration: "none", color: "black" }}
              >
                Order history
              </a>
            </li>
            <li>
              <a
                onClick={onStampClick}
                style={{ textDecoration: "none", color: "black" }}
              >
                Buy stamp
              </a>
            </li>

            <li>
              <a
                onClick={onLogoutClick}
                style={{ textDecoration: "none", color: "black" }}
              >
                Log out
              </a>
            </li>
          </ul>
        </div>
      </div>
      {account ? (
        <MyAccountPage />
      ) : wallet ? (
        ""
      ) : history ? (
        <HistoryPage />
      ) : stamp ? (
        <StampPage />
      ) : (
        ""
      )}
    </div>
  );
};

export default MyPage;
