import { useDispatch } from "react-redux";
import { React } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../../../_actions/user_actions";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Input, Button } from "antd";
import "../../../index.css";
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

//Formik : input관리를 위한 라이브러리 , Yup : 유효성 체크

const RegisterPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        name: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Email is  not valid")
          .required("Email is required"),
        lastName: Yup.string().required("Lastname is required"),
        password: Yup.string()
          .min(6, "password must be at least 6 characters")
          .required("Password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Password is not matched")
          .required("Confirmpassword is required"),
        phoneNumber: Yup.string().required("Phone number is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        console.log("clicked");
        setTimeout(() => {
          let dataToSubmit = {
            name: values.name,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            phoneNumber: values.phoneNumber,
          };
          dispatch(RegisterUser(dataToSubmit)).then((response) => {
            console.log(response);
            if (response.payload.success) {
              alert("가입되었습니다.");
              console.log("가입완료");
              navigate("/login");
            } else alert(response.payload.err.errmsg);
          });
          setSubmitting(false);
        }, 500);
      }}
    >
      {({
        values,
        touched,
        errors,
        dirty, //초기값과 같지 않다면 true
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <div className="app">
          <h2>Sign up</h2>
          <Form
            style={{ minWidth: "375px" }}
            {...formItemLayout}
            onSubmitCapture={handleSubmit}
          >
            <Form.Item required label="name">
              <Input
                id="name"
                placeholder="Enter your name"
                type="text"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.name && touched.name
                    ? "text-input error"
                    : "text-input"
                }
              />
              {errors.name && touched.name && (
                <div className="input-feedback">{errors.name}</div>
              )}
            </Form.Item>
            <Form.Item required label="Last Name">
              <Input
                id="lastName"
                placeholder="Enter your Last Name"
                type="text"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.lastName && touched.lastName
                    ? "text-input error"
                    : "text-input"
                }
              />
              {errors.lastName && touched.lastName && (
                <div className="input-feedback">{errors.lastName}</div>
              )}
            </Form.Item>

            <Form.Item required label="Phone Number">
              <Input
                id="phoneNumber"
                placeholder="without '-' ex)01011112222"
                type="text"
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.phoneNumber && touched.phoneNumber
                    ? "text-input error"
                    : "text-input"
                }
              />
              {errors.phoneNumber && touched.phoneNumber && (
                <div className="input-feedback">{errors.phoneNumber}</div>
              )}
            </Form.Item>

            <Form.Item
              required
              label="Email"
              hasFeedback
              validateStatus={
                errors.email && touched.email ? "error" : "success"
              }
            >
              <Input
                id="email"
                placeholder="Enter your Email"
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

            <Form.Item
              required
              label="Password"
              hasFeedback
              validateStatus={
                errors.password && touched.password ? "error" : "success"
              }
            >
              <Input
                id="password"
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
            <Form.Item required label="Confirm" hasFeedback>
              <Input
                id="confirmPassword"
                placeholder="Enter your confirmPassword"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.confirmPassword && touched.confirmPassword
                    ? "text-input error"
                    : "text-input"
                }
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <div className="input-feedback">{errors.confirmPassword}</div>
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button
                type="primary"
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default RegisterPage;
