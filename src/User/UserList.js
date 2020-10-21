import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
const UserList = ({ users }) => {
  const myId = JSON.parse(localStorage.getItem("user")).userId || "";
  const submitHundler = (event) => {
    event.preventDefault()
  }
  return (
    <div>
      <h1>Списко пользователей</h1>
      <form onSubmit={submitHundler}>
      <div class="input-group mb-3">
  <input type="text" class="form-control" placeholder="User ID" />
  <div class="input-group-prepend">
    <button className="btn btn-warning">Search</button>
  </div>
</div>
      </form>
      <div className="list-group">
        {users &&
          users.map(
            (user) =>
              user.id != myId && (
                <div className="list-group-item list-group-item-action">
                  <UserCard id={user.id} name={user.name} email={user.email} />
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default UserList;
