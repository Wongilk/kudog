import { React, useState } from "react";
import { USER_SERVER } from "../../Config";
import HistoryPage from "./Sections/HistoryPage";
import MyAccountPage from "./Sections/MyAccountPage";
import StampPage from "./Sections/StampPage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import WriteReviewPage from "./Sections/WriteReviewPage";

const MyPage = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState(true);
  const [address, setAddress] = useState(false);
  const [history, setHistory] = useState(false);
  const [review, setReview] = useState(false);
  const [stamp, setStamp] = useState(false);
  const [proInfoForReview, setProInfoForReview] = useState({});
  //const [selectItemId, setSelectItemId] = useState(""); //수정사항 =>삭제
  const onAccountClick = () => {
    setAccount(true);
    setAddress(false);
    setHistory(false);
    setStamp(false);
    setReview(false);
  };
  const onHistoryClick = () => {
    setAccount(false);
    setAddress(false);
    setHistory(true);
    setStamp(false);
    setReview(false);
  };
  const onStampClick = () => {
    setAccount(false);
    setAddress(false);
    setHistory(false);
    setStamp(true);
    setReview(false);
  };

  const onWriteReviewClick = (element) => {
    setAccount(false);
    setAddress(false);
    setHistory(false);
    setStamp(false);
    setReview(true);
    setProInfoForReview(element);
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
      ) : history ? (
        <HistoryPage onWriteReviewClick={onWriteReviewClick} />
      ) : stamp ? (
        <StampPage />
      ) : review ? (
        <WriteReviewPage
          proInfoForReview={proInfoForReview}
          //selectItemId={selectItemId}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default MyPage;
