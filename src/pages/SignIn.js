/* eslint-disable no-undef */
import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import axios from "axios";
import { setUser } from "../store/users/actions";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useDispatch } from "react-redux";
import {config} from "dotenv";

const SignIn = () => {
  const { request } = useHttp();
  const dispatch = useDispatch();
  const [form, setForm] = useState({ username: "", password: "" });
  const auth = useContext(AuthContext);
  const [redirect, setRedirect] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    const { username, password } = form;
    if (password.trim().length >= 4 && username.trim().length >= 4) {
      try {
        const res = await axios.post("http://localhost:8080/api/auth/signin", {
          username,
          password,
        });
        console.log('!!!',res )
        const { accessToken, id } = res.data;
        dispatch(setUser(res));
        auth.login(accessToken, id);
        setRedirect(!!accessToken && !!id);
      } catch (error) {
        console.log(error)
      }
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
        <label htmlFor="username"> username </label>
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
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
