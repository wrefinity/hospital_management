import React, { useEffect, useState } from "react";
import logo from "../assets/img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { LineWave } from "react-loader-spinner";
import { Notifier } from "../utills/InputHelpers";
import {
  handleInput,
  loaderSize,
  loaderColor,
  validateEmpty,
} from "../utills/InputHelpers";
import { reseter, login } from "../slicer/Auth";

const LoginScreen = () => {
  const { user, status, message } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const redirector = () => {
    navigate(from, { replace: true });
  };

  const reset = () => {
    setFormData({
      email: "",
      password: "",
    });
  };

  useEffect(() => {
    if (isSubmit) {
      dispatchLogin();
    }
  }, [formErrors, status, message, isSubmit]);

  const handleLogin = (e) => {
    e.preventDefault();
    const errors = validateEmpty(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
        setIsSubmit(true);
    }
  };

  const dispatchLogin = () => {
    if (isSubmit) {
      dispatch(reseter());
      dispatch(login(formData)).then((action) => {
        if (login.fulfilled.match(action)) {
          Notifier(action.payload.message, "success", 4000);
          reset();
          redirector();
        }
        if (login.rejected.match(action)) {
          Notifier(action.payload?.message, "error");
          setIsSubmit(false);
        }
      });
    }
  };

  return (
    <main>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex justify-content-center py-4">
                  <Link to="/" className="txt-dec logo d-flex align-items-center w-auto">
                    <img src={logo} alt="" />
                    <span className="d-none d-lg-block">HMS</span>
                  </Link>
                </div>
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                      <p className="text-center small">Enter your username & password to login</p>
                    </div>
                    <form className="row g-3 needs-validation" onSubmit={handleLogin}>
                      <div className="col-12">
                        <label htmlFor="yourUsername" className="form-label">Username/Email</label>
                        <div className="input-group has-validation">
                          <span className="input-group-text" id="inputGroupPrepend">@</span>
                          <input
                            className="form-control"
                            id="yourUsername"
                            name="email"
                            type="text"
                            placeholder="enter username or email address"
                            value={formData.email}
                            onChange={(e) => handleInput(e, setFormData)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <label htmlFor="yourPassword" className="form-label">Password</label>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          id="yourPassword"
                          required
                          placeholder="enter username or email address"
                          value={formData.password}
                          onChange={(e) => handleInput(e, setFormData)}
                        />
                        <div className="invalid-feedback">Please enter your password!</div>
                      </div>
                      <div className="col-12">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe" />
                          <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                        </div>
                      </div>
                      <div className="col-12">
                        {status === "loading" ? (
                          <LineWave
                            color={loaderColor}
                            height={loaderSize}
                            width={loaderSize}
                          />
                        ) : (
                          <button className="btn btn-primary w-100" type="submit">Login</button>
                        )}
                      </div>
                      <div className="col-12">
                        <p className="small mb-0">Don't have account? <Link to="/register">Create an account</Link></p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LoginScreen;
