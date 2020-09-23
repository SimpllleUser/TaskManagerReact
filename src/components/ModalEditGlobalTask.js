import React, { useState } from "react"
import {  useDispatch } from "react-redux";
import { editGlobalTask } from "../store/global_task/actions";
// import { editProject } from "../store/project/actions";

const ModalEditGlobalTask = ({global_task }) => {
    const dispatch = useDispatch();

    const [global_taskForm, setGlobal_taskForm] = useState(global_task)

    const submitHandler = (event) => {
        event.preventDefault();
        const { id, title, description } = global_taskForm;
        // if (title.trim() && description.trim()) {
            const editabelGlobal_task = {
                id,
                title,
                description
            }
            dispatch(editGlobalTask(editabelGlobal_task))
        //}
    }

    const changeInputHandler = (event) => {
        setGlobal_taskForm({ ...global_taskForm, [event.target.name]: event.target.value });
    };

    return (
        <div
            className={"modal global_task"+global_task.id}
             role="dialog"
        >
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Create global task</h4>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body projectForm" >
                    <form onSubmit={submitHandler}>
                        <div className="project_create_title form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                className="form-control"
                                type="text"
                                name="title"
                                id="title"
                                value={global_taskForm.title}
                                onChange={changeInputHandler}
                            ></input>
                        </div>

                        <div className="project_create_description form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                className="form-control"
                                name="description"
                                id="description"
                                value={global_taskForm.description}
                                onChange={changeInputHandler}
                            ></textarea>
                        </div>
                        {/* data-dismiss="modal" aria-label="Close" */}
                        <button className="btn btn-success m-2" type="submit" >Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModalEditGlobalTask