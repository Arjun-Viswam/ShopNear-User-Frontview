import React from "react";
import "./Signup.css";
import DoValidation from "../Components/Signupvalidation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import firebase from "../firebase";
import cookie from "universal-cookie";
import { useHistory } from "react-router";
import "react-phone-number-input/style.css";
import PhoneInput, {
  isValidPhoneNumber,
} from "react-phone-number-input";
const server = "http://localhost:5550";

function Signup() {
  const history = useHistory();
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      history.push("/");
    }
  });

  const firstnameref = useRef();
  const lastnameref = useRef();
  const emailref = useRef();
  const passwordref = useRef();
  const coderef = useRef();
  const Cookies = new cookie();

  const [showActiveForm, setShowActiveForm] = useState(false);
  const [InputData, setInputData] = useState({});
  const [EmailError, setEmailError] = useState(false);
  const [MobileError, setMobileError] = useState(false);
  const [NotFound, setNotFound] = useState(false);
  const [TimeOut, setTimeOut] = useState(false);
  const [value, setValue] = useState();

  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "normal",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
        },
      }
    );
  };

  const onSignInSubmit = (event) => {
    event.preventDefault();
    let userData = {};
    userData.email = emailref.current.value;
    userData.mobile = value;
    axios
      .post(`${server}/checkData/`, userData)
      .then((checkRes) => {
        if (checkRes.data.response.existing) {
          setEmailError(true);
        } else if (checkRes.data.response.mobileExist) {
          setMobileError(true);
        } else {
          setUpRecaptcha();
          const phoneNumber = value;
          const appVerifier = window.recaptchaVerifier;
          firebase
            .auth()
            .signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
              // SMS sent. Prompt user to type the code from the message, then sign the
              // user in with confirmationResult.confirm(code).
              window.confirmationResult = confirmationResult;
              setInputData({
                firstname: firstnameref.current.value,
                lastname: lastnameref.current.value,
                email: emailref.current.value,
                mobile: value,
                password: passwordref.current.value,
              });
              setShowActiveForm(true);
            })
            .catch((error) => {
              // Error; SMS not sent
              setNotFound(true);
            });
        }
      })
      .catch((error) => {
        setNotFound(true);
      });
  };

  const otpSubmit = (event) => {
    event.preventDefault();
    const code = coderef.current.value;
    let confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(code)
      .then((result) => {
        axios
          .post(`${server}/signup/`, InputData)
          .then((res) => {
            let data = JSON.parse(JSON.stringify(res.data));
            Cookies.set("token", data.token);
            localStorage.setItem("firstname", data.data.firstname);
            localStorage.setItem("lastname", data.data.lastname);
            history.push("/");
          })
          .catch((err) => {
            setNotFound(true);
          });
      })
      .catch((error) => {
        setTimeOut(true);
        // User couldn't sign in (bad verification code?)
        // ...
      });
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validate = Yup.object({
    firstname: Yup.string()
      .min(4, "Must be more than 4 Characters")
      .required("Enter your first name"),
    lastname: Yup.string()
      .min(4, "Must be more than 4 Characters")
      .required("Enter your last name"),
    email: Yup.string()
      .email("Please type a valid email")
      .required("Enter your email"),
    password: Yup.string()
      .min(6, "Must be more than 6 Characters")
      .required("Enter your password"),
    mobile: Yup.string()
      .min(10)
      .max(10)
      .matches(phoneRegExp, "Phone number is not valid"),
    checkbox: Yup.string().required("Required"),
  });
  return (
    <Formik
      initialValues={{
        firstname: "",
        lastname: "",
        email: "",
        mobile: "",
        password: "",
      }}
      validationSchema={validate}
    >
      {(formik) => {
        return (
          <div>
            {NotFound ? (
              <div>
                <img
                  style={{ width: "100%" }}
                  src="/images/404.jpg"
                  alt="server under maintenance"
                />
              </div>
            ) : (
              <div className="container123">
                <div className="row justify-content-center">
                  <div className="col-md-4">
                    <div className="lg_form">
                      <div className="main-heading">
                        <h2>Sign Up to Shop Near</h2>
                        <div className="line-shape1">
                          <img src="/images/line.svg" alt="" />
                        </div>
                      </div>
                      {!showActiveForm ? (
                        <Form onSubmit={onSignInSubmit}>
                          <div className="form-group">
                            <div className="row">
                              <div className="col-md-6">
                                <label className="label15">First Name*</label>
                                <DoValidation
                                  ref={firstnameref}
                                  type="text"
                                  className="job-input"
                                  name="firstname"
                                  placeholder="Enter the First Name"
                                  required
                                />
                              </div>
                              <div className="col-md-6">
                                <label className="label15">Last Name*</label>
                                <DoValidation
                                  ref={lastnameref}
                                  type="text"
                                  className="job-input"
                                  name="lastname"
                                  placeholder="Enter the Last Name"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="label15">Email Address*</label>
                            <DoValidation
                              ref={emailref}
                              type="email"
                              className="job-input"
                              name="email"
                              placeholder="Enter Email Address"
                              required
                            />
                            {EmailError ? (
                              <a className="error">
                                Entered Email already Exist
                              </a>
                            ) : null}
                          </div>
                          <div className="form-group">
                            <label className="label15">Phone Number*</label>
                            {/* <DoValidation
                              ref={mobileref}
                              id="phone"
                              type="tel"
                              className="job-input"
                              name="mobile"
                              placeholder="Enter your Contact number"
                              
                            /> */}
                            <PhoneInput
                              country="US"
                              className="job-input"
                              value={value}
                              onChange={setValue}
                              name="mobile"
                              placeholder="Enter your Contact number"
                              error={
                                value
                                  ? isValidPhoneNumber(value)
                                    ? undefined
                                    : "Invalid phone number"
                                  : "Phone number required"
                              }
                              required
                            />
                            {MobileError ? (
                              <a className="error">
                                Entered Mobile Number already Exist
                              </a>
                            ) : null}
                          </div>
                          <div className="form-group">
                            <label className="label15">Password*</label>
                            <DoValidation
                              ref={passwordref}
                              type="password"
                              className="job-input"
                              name="password"
                              placeholder="Enter your Password"
                              required
                            />
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              name="checkbox"
                              tabindex="0"
                              required
                            />
                            <label className="label15">
                              &nbsp; I accept the Terms of Services
                            </label>
                          </div>
                          <div id="recaptcha-container"></div>
                          <button type="submit" className="lr_btn">
                            Next
                          </button>
                          <div className="done140">
                            Already have an account?
                            <a href="/login">
                              Sign in Now
                              <i className="fas fa-angle-double-right"></i>
                            </a>
                          </div>
                        </Form>
                      ) : (
                        <Form onSubmit={otpSubmit}>
                          <input
                            type="text"
                            ref={coderef}
                            className="job-input"
                            name="code"
                            placeholder="Enter the OTP"
                          ></input>
                          <button type="submit" className="lr_btn">
                            Next
                          </button>
                        </Form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {TimeOut ? (
              <div>
                <img
                  src="/images/timeout.webp"
                  alt="server under maintenance"
                />
              </div>
            ) : null}
          </div>
        );
      }}
    </Formik>
  );
}

export default Signup;
