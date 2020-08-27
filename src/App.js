import React from "react";
import { BrowserRouter } from "react-router-dom";
import {useRoutes} from './routes'


function App() {
  const routes = useRoutes(true);
  const activePage = "active btn btn-primary";
  return (
    <div className="container pt-3">
      <a href="/signIn" className="btn btn-primary">signIn</a>
      <a href="/signUp" className="btn btn-primary ml-2">signUp</a>

      <div className="nav-links">
        <BrowserRouter>
      {routes}
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
