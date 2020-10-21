import React, { useState, useEffect } from "react";
import UserCard from "./UserCard"
const UserList = ({users}) => {
const myId = JSON.parse(localStorage.getItem("user")).userId || '' 
return (
    <div>
        <h1>Списко пользователей</h1>
        <div className="list-group">
        {users && users.map(user => user.id != myId &&   
            <div className="list-group-item list-group-item-action">
                <UserCard id={user.id} name={user.name} email={user.email}/>
            </div>
        )}
        </div>
    </div>  
)
}

export default  UserList 