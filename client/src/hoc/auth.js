import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { AuthUser } from "../_actions/user_actions";
import { useNavigate } from "react-router-dom";
const Auth = (SpecificComponent, option, adminroute = null) => {
  //option true: 로그인한 유저만 출입 가능한 페이지
  //false : 로그인하지 않은 유저만 출입 가능한 페이지
  //null : 아무나 출입 가능한 페이지
  const AuthenticationCheck = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
      dispatch(AuthUser()).then((response) => {
        console.log(response);
        //로그인을 하지 않았다면
        if (!response.payload.isAuth) {
          if (option) navigate("/login");
        }
        //로그인을 했다면
        else {
          if (adminroute && !response.payload.isAdmin) {
            navigate("/");
          } else {
            if (option === false) navigate("/");
          }
        }
      });
    }, []);
    return <SpecificComponent />;
  };
  return <AuthenticationCheck />;
};
export default Auth;
