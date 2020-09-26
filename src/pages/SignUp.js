import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";

const SignUp = () => {
  const { request } = useHttp();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [redirect, setRedirect] = useState(false);
  const submitHandler = async () => {
    const { username, email, password } = form;

    if (password.trim().length >= 4 && username.trim().length >= 4) {
      try {
        const res = request("http://localhost:8080/api/auth/signup","post", {
          username,
          email,
          password,
        });
        if(res.allow){
       setRedirect(res.data.allow)
      }
      } catch (err) {
        console.log('err',err);
      }
    }
  };

  const changeInputHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  if(redirect){
    return <Redirect to="/" />;
  }

  return (
    <div className="auth-form">
      <h1 className="text-center"> SignUp </h1>
      <form onSubmit={submitHandler}>
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
        <div className="btn-form mt-2"></div>
        <button
          className="btn btn-success send-task m-1"
          // onClick={() => {
          //   submitHandler();
          // }}
        >
          Регистрация
        </button>
        <NavLink to="/SignIn" className="btn btn-outline-primary m-1">Авторизация</NavLink>
      </form>
    </div>
  );
};

export default SignUp;
