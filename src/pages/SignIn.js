/* eslint-disable no-undef */
import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import axios from "axios";
import {setUser} from "../store/users/actions";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import {useDispatch} from "react-redux";

const SignIn = () => {
  const { request } = useHttp();
  const dispatch = useDispatch()
  const [form, setForm] = useState({ login: "", password: "" });
  const auth = useContext(AuthContext);
  const [redirect, setRedirect] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    const { login, password } = form;
    if (password.trim().length >= 4 && login.trim().length >= 4) {
      let res = await axios.post('http://localhost:8080/api/auth/signin',{username:login, password})
      res = res.data;
      dispatch(setUser(res))
      auth.login(res.accessToken, res.id);
      setRedirect(!!res.accessToken && !!res.id);
    }
  };

  const changeInputHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: "/projects-list",
        }}
      />
    );
  }
  return (
    <div className="auth-form">
      <h1 className="text-center">SignIn</h1>
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
        <div className="btn-form mt-2">
          <button className="btn btn-success send-task m-1">Вход</button>
          <NavLink to="/SignUp" className="btn btn-outline-primary m-1">
            Регистрация
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
