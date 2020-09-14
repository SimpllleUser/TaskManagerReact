/* eslint-disable no-undef */
import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, NavLink } from "react-router-dom";

import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const SignIn = () => {
  const [form, setForm] = useState({ login: "", password: "" });
  // const [user, setUser] = useState("");
  const auth = useContext(AuthContext);
  const [redirect, setRedirect] = useState(false);
  const submitHandler = async (event) => {
    event.preventDefault();
    const { login, password } = form;
    if (password.trim().length >= 4 && login.trim().length >= 4) {
      const res = await axios.post("http://localhost:8080/api/auth/signin", {
        password,
        username: login,
      });
      auth.login(res.data.accessToken, res.data.id);
      setRedirect(!!res.data.accessToken && !!res.data.id);
    }
  };

  const changeInputHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }
  return (
    <div>
      <h1>SignIn</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="login"> Login </label>
        <input
          type="text"
          className="form-control"
          id="login"
          name="login"
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
        <button className="btn btn-success send-task mt-2">Вход</button>
        <NavLink to="/SignUp">Регистрация</NavLink>
      </form>
    </div>
  );
};

export default SignIn;
