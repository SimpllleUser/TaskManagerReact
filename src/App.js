import React from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import { AuthContext } from "./context/AuthContext.js";
import { useAuth } from "./hooks/auth.hook";
import { useRoutes } from "./routes";
import Header from "./components/Header";
function App() {
  const { token, login, logout, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <div className="container pt-3">
      <div className="nav-links">
        <AuthContext.Provider
          value={{ token, login, logout, userId, isAuthenticated }}
        >
          <Router>
            {
              isAuthenticated ? (
                <Header />
              ) : (
                ""
              ) /* Или передавть пропс в Header*/
            }
            {routes}
          </Router>
        </AuthContext.Provider>
      </div>
    </div>
  );
}

export default App;
