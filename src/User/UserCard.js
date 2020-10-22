import React, { useState, useEffect } from "react";

const UserCard = ({id, name, email}) => {
return (
    <div className="card">
        <div className="card-body">
            ID: <span class="badge badge-success">{id}</span>
            <h3 class="card-title">{name}</h3>
            Email: <span class="badge badge-pill badge-dark">{email}</span>
        </div>
    </div>
)
}

export default  UserCard 