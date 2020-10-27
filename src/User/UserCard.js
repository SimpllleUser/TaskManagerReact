import React from "react";
import { XSquare } from "react-feather";
import { useDispatch } from "react-redux";
import { deleteUser } from "../store/users/actions";

const UserCard = ({ project_id, id, name, email }) => {
  const dispatch = useDispatch();

  return (
    <div className="card">
      <div className="card-body">
        <div className="card-header d-flex align-items-center">
          ID: <span className="badge badge-success ml-1">{id}</span>
          <div
            className="ml-auto"
            onClick={() => {
              dispatch(deleteUser({ project_id, user_id: id }));
            }}
          >
            <XSquare size="18" />
          </div>
        </div>
        <h3 className="card-title">{name}</h3>
        Email: <span className="badge badge-pill badge-dark">{email}</span>
      </div>
    </div>
  );
};

export default UserCard;
