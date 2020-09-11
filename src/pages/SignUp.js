import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [user, setUser] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    const { username, email, password } = form;
    console.log(username, password);
    //if (password.trim().length > 4 && username.trim().length > 4) {
    const registerUser = await axios.post(
      "http://localhost:8080/api/auth/signup",
      {
        username,
        email,
        password,
      }
    );

    setUser(registerUser.data);
    localStorage.setItem("user", user.accessToken);

    //}
    console.log(username, password);
  };

  const changeInputHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  if (redirect) {
    return <Redirect to="/" />;
  }

  
  return (
    <div>
      <h1> SignUp </h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="login"> Login </label>
        <input
          type="text"
          className="form-control"
          id="login"
          name="login"
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
        <button className="btn btn-success send-task mt-2" type="submit">
          Регистрация
        </button>
      </form>
    </div>
  );
};

export default SignUp;
