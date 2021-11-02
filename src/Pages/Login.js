import React, { useRef, useState, useEffect } from "react";
import "./Signup.css";
import axios from "axios";
import UserLogin from "../Components/UserLogin";
import { useFormik, Form } from "formik";
import * as Yup from "yup";
import cookie from "universal-cookie";
import { useHistory } from "react-router";
const server = "http://localhost:5550";

function Login() {
  const Cookies = new cookie();
  const history = useHistory();
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      history.push("/");
    }
  });
  const emailref = useRef();
  const passwordref = useRef();

  const [LoginError, setLoginError] = useState(false)

  const FormSubmit = (event) => {
    const data = {};
    data.email = emailref.current.value;
    data.password = passwordref.current.value;
    axios.post(`${server}/userLogin`, data).then((res) => {
      let data = JSON.parse(JSON.stringify(res.data));
      console.log(data.data);
      if(!data.data.status){
        setLoginError(true)
      }else {
      Cookies.set("token", data.token);
      localStorage.setItem("firstname", data.data.user.firstname);
      localStorage.setItem("lastname", data.data.user.lastname);
      history.push("/");
      }
    });
  };
  let validate = Yup.object({
    email: Yup.string()
      .email("Please type a valid email")
      .required("Enter your email"),
    password: Yup.string()
      .min(6, "Must be more than 6 Characters")
      .required("Enter your password"),
  });
  let Formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validate,
    onSubmit:FormSubmit
  });

  return (
    <div>
      <div className="container123">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="lg_form">
              <div className="main-heading">
                <h2>Sign in to Jobby</h2>
                <div className="line-shape1">
                  <img src="/images/line.svg" alt="" />
                </div>
              </div>
              <form onSubmit={Formik.handleSubmit}>
                <div className="form-group">
                  <UserLogin
                    ref={emailref}
                    label="Email Address*"
                    type="email"
                    className="job-input"
                    name="email"
                    placeholder="Enter Email Address"
                    onChange={Formik.handleChange}
                  />
                  {Formik.errors? Formik.errors.email:null}
                </div>
                <div className="form-group">
                  <UserLogin
                    ref={passwordref}
                    label="Password*"
                    type="password"
                    className="job-input"
                    name="password"
                    placeholder="Enter Password"
                    onChange={Formik.handleChange}
                  />
                  {Formik.errors? Formik.errors.password:null}
                  {LoginError? 
                  <p style={{color:"red"}}>Email or password does not Match</p>:null}
                </div>
                <button className="lr_btn" type="submit">
                  Sign in Now
                </button>
              </form  >
              <div className="done145">
                <div className="done146">
                  Need an account?
                  <a href="/signup">
                    Join us Now<i className="fas fa-angle-double-right"></i>
                  </a>
                </div>
                <div className="done147">
                  <a href="forgot_password.html">Forgot Password?</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
 