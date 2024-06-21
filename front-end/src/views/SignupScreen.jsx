import { useRef, useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import logo from "../assets/img/logo.png"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reseter } from "../slicer/Auth";
import { LineWave } from "react-loader-spinner";
import {
  Notifier,
  handleInput,
  loaderSize,
  loaderColor,
  validate,
} from "../utills/InputHelpers";



const SignupScreen = () => {
  const { status, message } = useSelector((state) => state?.auth);
  const [signupData, setSignup] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const referal = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reset = () => {
    setSignup({
      email: "",
      username: "",
      password: "",
    });
  };

  useEffect(() => {
    referal.current();
  }, [formErrors, status, message, navigate, dispatch]);

  const handleSignup = (e) => {
    setFormErrors({})
    e.preventDefault();
    setFormErrors(validate(signupData));
    setIsSubmit(true);
  };

  const dispatchSignup = () => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      dispatch(register(signupData));
      setIsSubmit(false);
    }

    if (status === "succeeded") {
      Notifier(message, "success")
      reset();
      dispatch(reseter());
      setIsSubmit(false);
      navigate("/login");
    }
    if (status === "failed") {
      Notifier(message, "error")
      dispatch(reseter());
    }
  };
  referal.current = dispatchSignup;
  return (
    <main>
      <div class="container">

        <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                <div class="d-flex justify-content-center py-4">
                  <Link to="/" class="txt-dec logo d-flex align-items-center w-auto">
                    <img src={logo} alt="logos" />
                    <span class="d-none d-lg-block">Inventory</span>
                  </Link>
                </div>

                <div class="card mb-3">

                  <div class="card-body">

                    <div class="pt-4 pb-2">
                      <h5 class="card-title text-center pb-0 fs-4">Create an Account</h5>
                      <p class="text-center small">Enter your personal details to create account</p>
                    </div>

                    <form class="row g-3 needs-validation" onSubmit={handleSignup}>
                      <div class="col-12">
                        <label for="yourName" class="form-label">Username</label>
                        <input
                          type="text"
                          name="username"
                          class="form-control"
                          id="yourName"
                          required
                          placeholder="username"
                          value={signupData.username}
                          onChange={(e) => handleInput(e, setSignup)} />
                        <div class="invalid-feedback">Please, enter your name!</div>
                      </div>

                      <div class="col-12">
                        <label for="yourEmail" class="form-label">{formErrors?.username}</label>
                        <input
                          type="email"
                          name="email"
                          class="form-control"
                          id="yourEmail"
                          required
                          placeholder="email"
                          value={signupData.email}
                          onChange={(e) => handleInput(e, setSignup)}

                        />
                        <div class="invalid-feedback">{formErrors?.email}</div>
                      </div>



                      <div class="col-12">
                        <label for="yourPassword" class="form-label">Password</label>
                        <input
                          type="password"
                          name="password"
                          class="form-control"
                          id="yourPassword"
                          required
                          placeholder="password"
                          value={signupData.password}
                          onChange={(e) => handleInput(e, setSignup)}

                        />
                        <div class="invalid-feedback">{formErrors?.password}</div>

                      </div>



                      <div class="col-12">

                        {status === "loading" ? (
                          <LineWave
                            color={loaderColor}
                            height={loaderSize}
                            width={loaderSize}
                          />
                        ) : (
                          <button class="btn btn-primary w-100" type="submit" disable={isSubmit}>Create Account</button>
                        )}
                      </div>
                      <div class="col-12">
                        <p class="small mb-0">Already have an account? <Link to={'/login'} className='txt-dec' >Log in</Link></p>
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

  )
}

export default SignupScreen

