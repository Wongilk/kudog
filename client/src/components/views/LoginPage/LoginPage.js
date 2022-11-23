import { React, useState } from "react";
import { LoginUser } from "../../../_actions/user_actions";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Input, Button, Checkbox, Typography } from "antd";
import { useDispatch } from "react-redux";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const LoginPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [rememberMe, setRemeberme] = useState(rememberMeChecked);

  const handleRememberme = () => {
    setRemeberme(!rememberMe);
  };

  const initialEmail = localStorage.getItem("rememberMe")
    ? localStorage.getItem("rememberMe")
    : "";

  return (
    <Formik
      initialValues={{
        email: initialEmail,
        password: "",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Email is invalid")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
          };
          dispatch(LoginUser(dataToSubmit))
            .then((response) => {
              if (response.payload.loginSuccess) {
                window.localStorage.setItem("userId", response.payload.userId);
                if (rememberMe === true) {
                  window.localStorage.setItem("rememberME", values.id);
                } else localStorage.removeItem("rememberMe");
                navigate("/");
              } else {
                alert(response.payload.message);
              }
            })
            .catch((err) => {
              setFormErrorMessage("Check out your Account or Password again");
              setTimeout(() => {
                setFormErrorMessage("");
              }, 3000);
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {({
        values,
        touched,
        errors,
        dirty,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <div className="app">
          <Title level={2}>Log In</Title>
          <Form onSubmitCapture={handleSubmit} style={{ width: "350px" }}>
            <Form.Item required>
              <Input
                id="email"
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="Enter your email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.email && touched.email
                    ? "text-input error"
                    : "text-input"
                }
              />
              {errors.email && touched.email && (
                <div className="input-feedback">{errors.email}</div>
              )}
            </Form.Item>

            <Form.Item required>
              <Input
                id="password"
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="Enter your password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.password && touched.password
                    ? "text-input error"
                    : "text-input"
                }
              />
              {errors.password && touched.password && (
                <div className="input-feedback">{errors.password}</div>
              )}
            </Form.Item>

            {formErrorMessage && (
              <label>
                <p
                  style={{
                    color: "#ff0000bf",
                    fontSize: "0.7rem",
                    border: "1px solid",
                    padding: "1rem",
                    borderRadius: "10px",
                  }}
                >
                  {formErrorMessage}
                </p>
              </label>
            )}

            <Form.Item>
              <Checkbox
                className="text-secondary btn-secondary"
                id="rememberMe"
                onChange={handleRememberme}
                checked={rememberMe}
              >
                Remember me
              </Checkbox>
              <a
                className="login-form-forgot text-secondary"
                href="/reset_user_password"
                style={{ float: "right" }}
              >
                Find Password
              </a>
              <a className="text-secondary" style={{ float: "right" }}>
                &nbsp; | &nbsp;
              </a>
              <a
                className="login-form-forgot text-secondary"
                href="/reset_user_id"
                style={{ float: "right" }}
              >
                Find ID
              </a>
              <div>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ minWidth: "100%" }}
                  disabled={isSubmitting}
                  onSubmit={handleSubmit}
                >
                  Log in
                </Button>
              </div>
              계정이 없으시다면, <a href="/register">가입하러 가기</a>
            </Form.Item>
          </Form>
        </div>
      )}
    </Formik>
  );
};
export default LoginPage;
