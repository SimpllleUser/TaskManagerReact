import React, { useState, useEffect } from "react";
import {useHttp} from "../hooks/http.hook"
const SelectorUserForm = (props) => {
  const { request } = useHttp();
  const [selectorData, setSelectorData] = useState('')
  const [users, setUsers] = useState([])
  useEffect(() => {
    const initUsers = async () => {
      const users = await request('/user/all/' + props.projectID)
      setUsers(users);
      props.updateData(users[0])
      setSelectorData(users[0])
    };
    initUsers();
  }, [props.projectID]);

  const SelectorHandler = (event) => {
    setSelectorData(event.target.value);
    const user = users.filter(user => user.id === event.target.value)[0]
    props.updateData(user);
  };

  const Selector = users?.map((option, index) => (
    <option key={index} value={option.id}>
      {option.name}
    </option>
  ));

  const selector =   <select
      className="custom-select my-1 mr-sm-1"
      id="priority"
      value={props.value || selectorData}
      onChange={SelectorHandler}
  >
    {Selector}
  </select>

  return (
    <div id="selector">
      <div className="selector-name badge badge-light">
        user
      </div>
      {
        users.length >= 2 ? selector : <div className='border rounded p-2' > {users[0]?.name}</div>
      }

    </div>
  );
};

export default SelectorUserForm;
