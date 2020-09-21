import React from "react"
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteGlobalTask } from "../store/global_task/actions";
import ModalEditGlobalTask from "../components/ModalEditGlobalTask"
const GlobalTaskCard = ({ id,global_taskId, title, description }) => {
    const dispatch = useDispatch();

    return (
        <div className="global_task">
            {global_taskId}
            <h4>
                <NavLink to={`/detail-global_task/` + global_taskId}>
                    {title}
                </NavLink>
            </h4>
            <div>
                <p>{description}</p>
                {/* <span>Progress</span>00% */}
                <button onClick={() => { dispatch(deleteGlobalTask(id,global_taskId)) }} className="btn btn-danger global_task-delete" >&times;</button>
            <ModalEditGlobalTask  global_task={{ id:global_taskId,title,description }} />
                <button className="btn btn-warning" data-toggle="modal" data-target={".global_task" + global_taskId}>Edit</button>
                {/* <button onClick={() => { dispatch(deleteGlobalTask(id,global_taskId)) }} className="btn btn-danger global_task-delete" >&times;</button> */}

            </div>
        </div>
    )

}

export default GlobalTaskCard