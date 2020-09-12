import React, { useState,useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Redirect } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [redirect, setRedirect] = useState(false);
  const auth = useContext(AuthContext)

  const submitHandler = async () => {
    const { username, email, password } = form;

    if (password.trim().length >= 4 && username.trim().length >= 4) {
    const res = await axios.post(
      "http://localhost:8080/api/auth/signup",
      {
        username,
        email,
        password,
      }
    );
    auth.login(res.data.accessToken, res.data.id)
      setRedirect(!!res.data.accessToken && !!res.data.id)
    }
  };

  const changeInputHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  if (redirect) {
    if (redirect) {
      return (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      );
    }

  }
  return (
    <div>
      <h1> SignUp </h1>
      <div>
        <label htmlFor="login"> Login </label>
        <input
          type="text"
          className="form-control"
          id="login"
          name="username"
          onChange={changeInputHandler}
        />
        <label htmlFor="email"> Email </label>
        <input
          type="text"
          className="form-control"
          id="email"
          name="email"
          onChange={changeInputHandler}
        />
        <label htmlFor="password"> Password </label>
        <input
          type="text"
          className="form-control"
          id="password"
          name="password"
          onChange={changeInputHandler}
        />
        <button className="btn btn-success send-task mt-2" onClick={() => {submitHandler()}}>
          Регистрация
        </button>
      </div>
    </div>
  );
};

export default SignUp;
