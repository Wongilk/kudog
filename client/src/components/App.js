import { React, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import Regsiter from "./views/RegisterPage/RegsiterPage";
import Auth from "../hoc/auth";
import Footer from "./views/Footer/Footer";
import DetailProductPage from "./views/DetailProductPage/DetailProductPage";
import FindPasswordPage from "./views/FindPage/FindPasswordPage";
import FindIdPage from "./views/FindPage/FindIdPage";
import CartPage from "./views/CartPage/CartPage";
import HistoryPage from "./views/Mypage/Sections/HistoryPage";
import StampPage from "./views/Mypage/Sections/StampPage";
import HomePage from "./views/HomePage/HomePage";
import MyPage from "./views/Mypage/MyPage";
import MainLayout from "../utils/MainLayout";
import AdminPage from "./views/AdminPage/AdminPage";
import WriteReview from "./views/Mypage/Sections/WriteReviewPage";
import WriteReviewPage from "./views/Mypage/Sections/WriteReviewPage";
import ReviewPage from "./views/Review/ReviewPage";
import ContactPage from "./views/ContactPage/ContactPage";
const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <div style={{ paddingTop: "20px", minHeight: "calc(100vh - 80px)" }}>
          <Routes>
            {/*메뉴바 보여주고 싶은 컴포넌트*/}
            <Route element={<MainLayout />}>
              <Route path="/" element={Auth(HomePage, null)}></Route>
              <Route path="/product" element={Auth(LandingPage, null)}></Route>

              <Route
                path="/product/:productId"
                element={Auth(DetailProductPage, null)}
              ></Route>
              <Route path="/user/cart" element={Auth(CartPage, true)}></Route>
              <Route path="/mypage" element={Auth(MyPage, true)}></Route>
              <Route path="/history" element={Auth(HistoryPage, true)}></Route>
              <Route path="/stamp" element={Auth(StampPage, true)}></Route>
              <Route
                path="write_review"
                element={Auth(WriteReviewPage, true)}
              ></Route>
              <Route path="/review" element={Auth(ReviewPage, true)}></Route>
              <Route path="/contact" element={Auth(ContactPage, true)}></Route>
            </Route>

            {/*안 보여주고 싶은 컴포넌트*/}
            <Route path="/login" element={Auth(LoginPage, false)}></Route>
            <Route path="/register" element={Auth(Regsiter, false)}></Route>
            <Route
              path="/reset_user_id"
              element={Auth(FindIdPage, null)}
            ></Route>
            <Route
              path="/reset_user_password"
              element={Auth(FindPasswordPage, null)}
            ></Route>

            {/*AdminPage는 관리자만 접근 가능하도록 */}
            <Route
              path="/admin"
              element={Auth(AdminPage, true, "/upload")}
            ></Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
