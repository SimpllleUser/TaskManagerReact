import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {createGlobalTask} from "../store/global_task/actions"
const ModalCreateGlobalTask = (props) => {
  const dispatch = useDispatch();

  const [global_task, setGlobal_task] = useState({
    title: '',
    description: ''
  })

  const changeInputHandler = (event) => {
    setGlobal_task({ ...global_task, [event.target.name]: event.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault()

    const { title, description } = global_task
    if (!title.trim() && !description.trim()) {
      return
    }
    dispatch(createGlobalTask(props.project_id, global_task))
    setGlobal_task({})

  }

  return (
    <div
      className="modal fade"
      id="create-create-global_task"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-content p-5">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Create global task</h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body global_taskForm" >
            <form onSubmit={submitHandler}>
              <div className="global_taskForm-title" >
                <label htmlFor="title">Title</label>
                <input type="text" name="title" className="form-control" value={global_task.title} onChange={changeInputHandler} />
              </div>
              <div className="global_taskForm-description">
                <label htmlFor="description">Description</label>
                <textarea name="description" cols="30" rows="10" className="form-control" value={global_task.description} onChange={changeInputHandler} ></textarea>
              </div>
              <button type="submit" className="btn btn-success m-2" aria-hidden="true">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalCreateGlobalTask;
