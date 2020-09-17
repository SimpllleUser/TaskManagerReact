import React from "react";
import { Switch, Route, Redirect, useHistory  } from "react-router-dom";
import TaskCreate from "./pages/TaskCreate";
import TaskList from "./pages/TaskList";
import EditTask from "./pages/TaskEdit";
import EventCalendar from "./pages/EventCalendar";
import TaskDetail from "./pages/TaskDetail";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ProjectCreate from "./pages/ProjectCreate";
import ProjectsList from "./pages/ProjectsList";
import ProjectDetail from "./pages/ProjectDetail"



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
        <Route exact path="/create-project">
          <ProjectCreate />
        </Route>
        <Route exact path="/projects-list">
          <ProjectsList />
        </Route>
        <Route exact path="/detail-project/:id">
          <ProjectDetail />
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
