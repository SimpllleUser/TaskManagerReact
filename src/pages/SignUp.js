import React, { useState, useEffect } from "react";
import axios from "axios";

const SignUp = () => {
  const [form, setForm] = useState({login:'',password:''});

  const submitHandler = (event) => {
    event.preventDefault();
    const { login, password } = form;
    console.log(login, password);
    if (password.trim().length > 4 && login.trim().length > 4) {
      axios
        .post("http://localhost:8080/api/auth/signup", {
          password,
          username: login,
        })
        .then((res) => {
          console.log(res);
        });
    }
    console.log(login, password);
  };

  const changeInputHandler = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
  };

  return (
    <div>
      <h1>SignUp</h1>
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
          Регистрация
        </button>
      </form>
    </div>
  );
};

export default SignUp;
