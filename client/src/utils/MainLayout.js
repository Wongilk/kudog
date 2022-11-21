import NavBar from "../components/views/NavBar/NavBar";
import Header from "../components/views/Header/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <Header />
      <Outlet />
    </>
  );
};

export default MainLayout;
