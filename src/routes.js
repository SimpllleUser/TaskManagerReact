import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import TaskCreate from "./pages/TaskCreate";
import TaskList from "./pages/TaskList";
import EditTask from "./pages/TaskEdit";
import EventCalendar from "./pages/EventCalendar";
import TaskDetail from "./pages/TaskDetail";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

export const useRoutes = (isAuthUser) => {
  if (isAuthUser) {
    return (

      <Switch>

        <Route exact path="/">
          <TaskList />
        </Route>
        <Route exact path="/event-calendar">
          <EventCalendar />
        </Route>
        <Route path="/edit-task/:id">
          <EditTask />
        </Route>
        <Route path="/detail-task/:id">
          <TaskDetail />
        </Route>
        <Route exact path="/create-task">
          <TaskCreate />
        </Route>
        <Redirect to="/"/>
      </Switch>
    );
  }

  return <Switch>
       <Route path="/SignIn" exact>
          <SignIn />
        </Route>
        <Route path="/SignUp" exact>
          <SignUp />
        </Route>
        <Redirect to="/SignIn"/>
  </Switch>;
};
