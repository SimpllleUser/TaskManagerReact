import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import TaskCreate from "./TaskCreate";
import TaskList from "./TaskList";
import EditTask from "./TaskEdit";
import EventCalebdar from "./EventCalebdar";
import TaskDetail from "./TaskDetail";

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/" exact>
          <TaskList />
        </Route>
        <Route path="/event-calendar" exact>
          <EventCalebdar />
        </Route>
        <Route path="/edit-task/:id">
          <EditTask />
        </Route>
        <Route path="/create-task">
          <TaskCreate />
        </Route>
        <Route path="/detail-task/:id" exact>
          <TaskDetail />
        </Route>
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
        <TaskList />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}