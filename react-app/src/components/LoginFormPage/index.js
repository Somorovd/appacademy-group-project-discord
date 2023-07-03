import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/main/conversations" />;

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
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
    setEmail(user.email);
    setPassword(user.password);
    handleSubmit();
  }

  return (
    <>
      <div className="form-wrapper">
        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >
          <h1>Log In</h1>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="auth-button">Log In</button>
          <button
            className="auth-button"
            onClick={() => handleClickDemo(1)}
          >
            Log In as Demo User 1
          </button>
          <button
            className="auth-button"
            onClick={() => handleClickDemo(2)}
          >
            Log In as Demo User 2
          </button>
        </form>
      </div>
    </>
  );
}

export default LoginFormPage;
