import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) history.push("/main/conversations");

  const handleSubmit = async (e, user) => {
    if (e) e.preventDefault();
    let data;

    if (user)
      data = await dispatch(login(user.email, user.password));
    else
      data = await dispatch(login(email, password));

    if (data) setErrors(data);
  };

  const handleClickDemo = (id) => {
    const demoUsers = {
      1: {
        email: "bobbie@aa.io",
        password: "password"
      },
      2: {
        email: "demo@aa.io",
        password: "password"
      },
    }

    const user = demoUsers[id];
    handleSubmit(null, user);
  }

  const handleForgotPassword = () => {
    alert("Oops! Try logging in with a demo user.")
  }

  const handleRegister = () => {
    history.push("/signup");
  }

  return (
    <div className="login-page">
      <div className="login-form-wrapper">
        <div className="main-login">
          <header className="main-login__header">
            <h2>Welcome back!</h2>
            <p>We're so excited to see you again!</p>
          </header>
          <form
            className=""
            onSubmit={handleSubmit}
          >
            <section className="main-login__input-fields">
              <div>
                <label htmlFor="login-email">
                  Email
                  <span className="warning">
                    {
                      errors.password
                        ? ` -- ${errors.email}`
                        : "*"
                    }
                  </span>
                </label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="login-password">
                  Password
                  <span className="warning">
                    {
                      errors.password
                        ? ` -- ${errors.password}`
                        : "*"
                    }
                  </span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p
                  className="login-link"
                  onClick={handleForgotPassword}
                >
                  Forgot your password?
                </p>
              </div>
            </section>
            <section className="main-login__submission">
              <button
                type="submit"
                className="login-form__button login-submit"
              >
                Log In
              </button>
              <p>
                Need an account&nbsp;
                <span
                  className="login-link"
                  onClick={handleRegister}
                >
                  Register
                </span>
              </p>
            </section>
          </form>
        </div>
        <div className="other-login">
          <button
            className="login-form__button demo-login"
            onClick={() => handleClickDemo(1)}
          >
            Demo User 1
          </button>
          <button
            className="login-form__button demo-login"
            onClick={() => handleClickDemo(2)}
          >
            Demo User 2
          </button>
          <h2>
            Log in as a demo user
          </h2>
          <p>
            Click one of these links to log in instantly.
          </p>
        </div>
      </div>
    </div >
  );
}

export default LoginFormPage;
