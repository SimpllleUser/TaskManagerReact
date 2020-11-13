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
    };
    initUsers();
  }, [props]);

  const SelectorHandler = (event) => {
    setSelectorData(event.target.value);
    // props.updateData(event.target.value);
  };

  const Selector = users?.map((option, index) => (
    <option key={index} value={option.name}>
      {option.name}
    </option>
  ));
  return (
    <div id="selector">
      <select
        className="custom-select my-1 mr-sm-1"
        id="priority"
        value={selectorData}
        onChange={SelectorHandler}
      >
        {Selector}
      </select>
    </div>
  );
};

export default SelectorUserForm;
