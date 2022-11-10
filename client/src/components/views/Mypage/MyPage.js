import { React, useState } from "react";
import HistoryPage from "./Sections/HistoryPage";
import MyAccountPage from "./Sections/MyAccountPage";
import StampPage from "./Sections/StampPage";
const MyPage = () => {
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
  const onAddressClick = () => {
    setAccount(false);
    setAddress(true);
    setWallet(false);
    setHistory(false);
    setStamp(false);
  };
  const onWalletClick = () => {
    setAccount(false);
    setAddress(false);
    setWallet(true);
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
  return (
    <div>
      <h1>MyPage</h1>
      <div>
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
              onClick={onWalletClick}
              style={{ textDecoration: "none", color: "black" }}
            >
              My Wallet
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
        </ul>

        <div>
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
      </div>
    </div>
  );
};

export default MyPage;
