import React from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import { AuthContext } from "./context/AuthContext.js";
import { useAuth } from "./hooks/auth.hook";
import { useRoutes } from "./routes";
import Header from "./components/Header";
import {useSelector} from "react-redux";
import Loader from "./components/Loader";
function App() {
  const { token, login, logout, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
    const loader = useSelector((state) => state.loader.loader);

    return (
    <div>
      <AuthContext.Provider
        value={{ token, login, logout, userId, isAuthenticated }}
      >
        <Router>
          {isAuthenticated && <Header />}
            {loader && <Loader />}
            {<div className={"main-body " + `${loader ? 'loading-content': ''}`}>{routes}</div>}
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
