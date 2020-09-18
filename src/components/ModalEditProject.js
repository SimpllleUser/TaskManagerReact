import React, { useState } from "react"
import { connect, useDispatch } from "react-redux";
import { editProject } from "../store/project/actions";

const ModalEditProject = ({ project }) => {
    console.log('ModalEditProject', project)

    const dispatch = useDispatch();

    const [projectForm, setProjectForm] = useState(project)

    const submitHandler = (event) => {
        event.preventDefault();
        const { title, description } = projectForm;
        if (title.trim() && description.trim()) {
            const editabelProject = {
                title,
                description
            }
            dispatch(editProject(editabelProject))
        }
    }

    const changeInputHandler = (event) => {
        setProjectForm({ ...projectForm, [event.target.name]: event.target.value });
    };

    return (
        <div
            className={"modal project"+project.id}
            tabindex="-1" role="dialog"
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
                                value={projectForm.title}
                                onChange={changeInputHandler}
                            ></input>
                        </div>

                        <div className="project_create_description form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                className="form-control"
                                name="description"
                                id="description"
                                value={projectForm.description}
                                onChange={changeInputHandler}
                            ></textarea>
                        </div>
                        <button className="btn btn-success m-2">Save</button>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    )
}

export default ModalEditProject