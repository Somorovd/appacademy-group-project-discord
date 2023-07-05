import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const startYear = 1950
const currentYear = new Date().getFullYear()
const numYears = currentYear - startYear;

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/main/conversations" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {

      const birthday = `${year}-${month}-${day}`

      const user_obj = {
        username,
        email,
        birthday,
        password,
        phone_number: phoneNumber,
      }

      const data = await dispatch(signUp(user_obj));
      if (data) {
        setErrors(data)
        console.log(data);
      }
    } else {
      setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  return (
    <>
      <div className="form-wrapper">
        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >
          <h1>Create an account</h1>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            Phone Number
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              pattern="\d{3}-\d{3}-\d{4}"
              placeholder="123-456-7890"
              required
            />
          </label>
          <label>
            Date of Birth
            <div className="date-selectors">
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                <option value={""} hidden disabled>Month</option>
                {
                  months.map((month, i) => {
                    return (
                      <option value={i + 1} key={i} >
                        {month}
                      </option>
                    )
                  })
                }
              </select>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
              >
                <option value={""} hidden disabled>Day</option>
                {
                  Array.from({ length: 31 }, (_, i) => {
                    return (
                      <option value={i + 1} key={i}>
                        {i + 1}
                      </option>
                    )
                  })
                }
              </select>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value={""} hidden disabled>Year</option>
                {
                  Array.from({ length: numYears }, (_, i) => {
                    return (
                      <option value={currentYear - i} key={i}>
                        {currentYear - i}
                      </option>
                    )
                  })
                }
              </select>
            </div>
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
          <label>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Sign Up</button>
        </form >
      </div>
    </>
  );
}

export default SignupFormPage;
