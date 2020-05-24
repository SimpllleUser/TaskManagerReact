import React from "react"
import PostForm from "./components/PostForm"
import Potsts from "./components/Potsts"
import FetchedPosts from "./components/FetchedPosts"

function App() {
  return (
    <div className="container pt-3">
      <div className="row">
        <div className="col"><PostForm/></div>
      </div>
      <div className="row">
        <div className="col">
          <h2>Синхронные посты</h2>
          <Potsts posts={[1, 2, 3]} />
          </div>
        <div className="col">
        <h2>Асинхронные посты</h2>
          <FetchedPosts posts={[]} />
          </div>
      </div>
    </div>
  );
}

export default App;
