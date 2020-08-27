import React from "react"
import axios from "axios"

class SignUp extends React.Component{
    constructor(props){
        super(props)
        this.loginInput = React.createRef();
        this.passwordInput = React.createRef();

        this.state = {
            login: "",
            password: ""
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        const {login, password} = this.state
        if(password.trim().length > 4 && login.trim().length > 4){
            axios.post('http://localhost:8080/api/auth/signup',{
                password,
                login
            }).then(res => {console.log(res)})
        }
        console.log(login, password)
    }

    changeInputHandler = (event) => {
        event.persist();
        console.log(event.target.value)
        this.setState((prev) => ({
          ...prev,
          ...{
            [event.target.name]: event.target.value,
          },
        }));
      };

    render(){
        return (
            <div>
            <h1>SignUp</h1>
            <form onSubmit={this.submitHandler}>
            <label htmlFor="login"> Login </label>
            <input
              type="text"
              className="form-control"
              id="login"
              name="login"
              ref={this.loginInput}
              value={this.login}
              onChange={this.changeInputHandler}
            />
            <label htmlFor="password"> Password </label>
            <input
              type="text"
              className="form-control"
              id="password"
              name="password"
              ref={this.passwordInput}
              value={this.password}
              onChange={this.changeInputHandler}
            />
                    <button className="btn btn-success send-task mt-2" type="submit">
          Регистрация
        </button>
            </form>
        </div>
        )
    }
}

export default SignUp