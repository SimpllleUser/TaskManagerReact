import React, { useState, useEffect } from "react";
import axios from "axios";

const SignIn = () => {
  const [form, setForm] = useState({ login: "", password: "" });
  const [user, setUser] = useState("");
  const submitHandler = async (event) => {
    event.preventDefault();
    const { login, password } = form;
    if (password.trim().length > 4 && login.trim().length > 4) {
      const loginUser = await axios.post(
        "http://localhost:8080/api/auth/signin",
        {
          password,
          username: login,
        }
      );
      setUser(loginUser.data);
    }
  };

  const changeInputHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

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
        <button className="btn btn-success send-task mt-2" type="submit">
          Вход
        </button>
      </form>
    </div>
  );
};

export default SignIn;
