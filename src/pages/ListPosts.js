import React from "react";
import Posts from "../components/Posts";
import Calendar from "../components/Calendar";

const ListPosts = () => (
  <div>
    <h2>Lists posts</h2>
    <div className="row">
      <div className="col-6">
        <Posts />
      </div>
      <div className="col-6">
        <Calendar />
      </div>
    </div>
  </div>
);

export default ListPosts;